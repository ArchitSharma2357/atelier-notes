function normalizeSearchText(value = "") {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function tokenize(value = "") {
  return normalizeSearchText(value)
    .split(" ")
    .filter(Boolean);
}

function weightedMatch(text, query) {
  if (!query) {
    return 0;
  }

  if (text === query) {
    return 120;
  }

  if (text.startsWith(query)) {
    return 80;
  }

  if (text.includes(query)) {
    return 40;
  }

  return 0;
}

export function getSearchIndex(product) {
  const fields = {
    name: normalizeSearchText(product.name),
    category: normalizeSearchText(product.category),
    badge: normalizeSearchText(product.badge),
    tagline: normalizeSearchText(product.tagline),
    description: normalizeSearchText(product.description),
    highlights: normalizeSearchText(product.highlights.join(" ")),
  };

  return {
    ...fields,
    full: normalizeSearchText(
      `${product.name} ${product.category} ${product.badge} ${product.tagline} ${product.description} ${product.highlights.join(" ")}`,
    ),
  };
}

export function scoreProduct(product, query) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const tokens = tokenize(normalizedQuery);
  const index = getSearchIndex(product);

  let score = 0;
  score += weightedMatch(index.name, normalizedQuery);
  score += weightedMatch(index.tagline, normalizedQuery) * 0.8;
  score += weightedMatch(index.category, normalizedQuery) * 0.9;
  score += weightedMatch(index.highlights, normalizedQuery) * 0.65;
  score += weightedMatch(index.description, normalizedQuery) * 0.45;

  for (const token of tokens) {
    if (index.name.includes(token)) score += 28;
    if (index.tagline.includes(token)) score += 18;
    if (index.category.includes(token)) score += 14;
    if (index.highlights.includes(token)) score += 12;
    if (index.description.includes(token)) score += 8;
  }

  const matchedTokens = tokens.filter((token) => index.full.includes(token)).length;
  if (matchedTokens === tokens.length && tokens.length > 1) {
    score += 45;
  }

  if (/journal|notebook|paper/.test(normalizedQuery) && index.category.includes("journals")) {
    score += 15;
  }

  if (/pen|fountain|writing/.test(normalizedQuery) && index.category.includes("writing tools")) {
    score += 15;
  }

  if (/sticky|note|desk/.test(normalizedQuery) && (index.category.includes("desk") || index.name.includes("sticky"))) {
    score += 15;
  }

  return score;
}

export function sortProducts(products, sortBy) {
  const items = [...products];

  switch (sortBy) {
    case "price-asc":
      return items.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    case "price-desc":
      return items.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
    case "name":
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return items.sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }

        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }

        return a.name.localeCompare(b.name);
      });
  }
}

export { normalizeSearchText };

