import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const productsDir = path.join(rootDir, "public", "products");
const dataDir = path.join(rootDir, "src", "data");

const sourceFeeds = [
  "https://helloaugust.in/wp-json/wc/store/products?category=2214&per_page=12",
  "https://helloaugust.in/wp-json/wc/store/products?category=2076&per_page=12",
  "https://helloaugust.in/wp-json/wc/store/products?category=697&per_page=8",
  "https://helloaugust.in/wp-json/wc/store/products?category=2042&per_page=8",
  "https://helloaugust.in/wp-json/wc/store/products?category=516&per_page=8",
];

const catalogBlueprint = [
  {
    slug: "handmade-100-cotton-paper-notebook-5x7",
    category: "Journals",
    badge: "Editor's Pick",
    featured: true,
    tagline: "Compact cotton pages for pockets, planning, and thoughtful notes.",
  },
  {
    slug: "handmade-100-cotton-paper-notebook-6x8",
    category: "Journals",
    badge: "Bestseller",
    featured: true,
    tagline: "A roomier format with soft paper texture and a keepsake finish.",
  },
  {
    slug: "handmade-recycled-paper-notebook-button-closure",
    category: "Journals",
    badge: "Eco Choice",
    featured: false,
    tagline: "Recycled pages with a tactile cover and button closure detail.",
  },
  {
    slug: "click-renaissance-acrylic-fountain-pen-broad-nib-gold-trim-polar-white",
    category: "Writing Tools",
    badge: "Premium",
    featured: true,
    tagline: "A polished acrylic fountain pen designed for elegant, slower writing.",
  },
  {
    slug: "jinhao-599-a-fountain-pen-hooded-nib",
    category: "Writing Tools",
    badge: "Everyday Writer",
    featured: false,
    tagline: "A lightweight daily fountain pen with a clean modern profile.",
  },
  {
    slug: "jinhao-century-100-fountain-pen-white-transparent",
    category: "Writing Tools",
    badge: "Collector Favourite",
    featured: true,
    tagline: "Transparent construction, gold trim, and a desk-worthy presence.",
  },
  {
    slug: "sticky-note-paper-flag-neon-colour",
    category: "Desk Notes",
    badge: "Studio Essential",
    featured: false,
    tagline: "Bright paper flags that turn research, briefs, and edits into quick systems.",
  },
  {
    slug: "semi-transparent-sticky-note-paper-flag-5-colours",
    category: "Desk Notes",
    badge: "Focus Tool",
    featured: false,
    tagline: "Translucent note tabs for planners, textbooks, and layered annotation.",
  },
  {
    slug: "kangaro-td-18-tape-dispenser",
    category: "Desk Essentials",
    badge: "Desk Utility",
    featured: false,
    tagline: "A compact tape dispenser with a clean footprint for everyday wrapping and filing.",
  },
  {
    slug: "kangaro-hp-10-stapler",
    category: "Desk Essentials",
    badge: "Organize",
    featured: false,
    tagline: "A reliable compact stapler that keeps paper workflows feeling tidy.",
  },
];

function decodeHtmlEntities(value = "") {
  const named = {
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
    "&#039;": "'",
    "&nbsp;": " ",
    "&ldquo;": '"',
    "&rdquo;": '"',
    "&ndash;": "-",
    "&rsquo;": "'",
    "&hellip;": "...",
  };

  let output = value.replace(
    /&amp;|&quot;|&apos;|&#039;|&nbsp;|&ldquo;|&rdquo;|&ndash;|&rsquo;|&hellip;/g,
    (match) => named[match] ?? match,
  );

  output = output.replace(/&#(\d+);/g, (_, code) =>
    String.fromCodePoint(Number(code)),
  );

  return output;
}

function stripHtml(html = "") {
  return decodeHtmlEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<li>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+\n/g, "\n")
      .replace(/\n{2,}/g, "\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim(),
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function priceFromMinorUnits(amount) {
  return Number(amount || 0) / 100;
}

function buildHighlights(product) {
  const lines = stripHtml(product.short_description)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (line) =>
        !/illustration purpose|refund|replacement|despatched|contact\s+\d+/i.test(line),
    );

  return lines.slice(0, 4);
}

function buildDescription(product, fallbackTagline) {
  const baseName = stripHtml(product.name).replace(/\s*\(.+$/, "").trim();
  const normalizedDescription = stripHtml(product.description)
    .replace(new RegExp(escapeRegExp(baseName), "gi"), "")
    .replace(/\s{2,}/g, " ")
    .trim();

  const description = normalizedDescription
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .filter(
      (sentence) =>
        !/^About\s+/i.test(sentence) &&
        !/Hello August/i.test(sentence) &&
        !/click here/i.test(sentence),
    )
    .slice(0, 3)
    .join(" ");

  if (description) {
    return description.trim();
  }

  const shortDescription = stripHtml(product.short_description)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/illustration purpose|refund|replacement|despatched/i.test(line))
    .slice(0, 2)
    .join(" ");
  return shortDescription || fallbackTagline;
}

async function fetchJson(url, attempt = 1) {
  let response;

  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(30000),
    });
  } catch (error) {
    if (attempt < 3) {
      return fetchJson(url, attempt + 1);
    }

    throw error;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

async function downloadImage(url, slug, imageIndex) {
  const assetUrl = new URL(url);
  const extension = path.extname(assetUrl.pathname) || ".jpg";
  const filename = imageIndex === 0 ? `${slug}${extension}` : `${slug}-${imageIndex + 1}${extension}`;
  const outputPath = path.join(productsDir, filename);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, buffer);

  return `/products/${filename}`;
}

async function main() {
  await mkdir(productsDir, { recursive: true });
  await mkdir(dataDir, { recursive: true });

  const responses = [];

  for (const feed of sourceFeeds) {
    responses.push(await fetchJson(feed));
  }

  const allProducts = responses.flat();
  const productBySlug = new Map(allProducts.map((product) => [product.slug, product]));

  const catalog = [];

  for (const blueprint of catalogBlueprint) {
    const product = productBySlug.get(blueprint.slug);

    if (!product) {
      throw new Error(`Missing product for slug: ${blueprint.slug}`);
    }

    const gallery = [];
    const productImages = product.images.slice(0, 2);

    for (const [index, image] of productImages.entries()) {
      gallery.push(await downloadImage(image.src, blueprint.slug, index));
    }

    const price = priceFromMinorUnits(product.prices.price);
    const originalPrice = priceFromMinorUnits(product.prices.regular_price);

    catalog.push({
      id: product.id,
      slug: product.slug,
      name: stripHtml(product.name),
      price,
      originalPrice,
      description: buildDescription(product, blueprint.tagline),
      image: gallery[0],
      gallery,
      category: blueprint.category,
      badge: blueprint.badge,
      featured: blueprint.featured,
      tagline: blueprint.tagline,
      highlights: buildHighlights(product),
      inventory: Number(product.add_to_cart?.maximum || 12),
      inStock: Boolean(product.is_in_stock),
      source: "https://helloaugust.in/",
    });
  }

  await writeFile(
    path.join(dataDir, "products.json"),
    `${JSON.stringify(catalog, null, 2)}\n`,
  );

  console.log(`Scraped ${catalog.length} products into src/data/products.json`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
