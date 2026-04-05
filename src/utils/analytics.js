const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "G-QD9K0FQNWX";

function hasAnalytics() {
  return Boolean(GA_ID);
}

function eventPayload(product, quantity = 1) {
  return {
    currency: "INR",
    value: product.price * quantity,
    items: [
      {
        item_id: String(product.id),
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity,
      },
    ],
  };
}

export function initAnalytics() {
  if (!hasAnalytics() || typeof window === "undefined") {
    return;
  }

  if (window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(path) {
  if (!hasAnalytics() || !window.gtag) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackViewItem(product) {
  if (!hasAnalytics() || !window.gtag) {
    return;
  }

  window.gtag("event", "view_item", eventPayload(product));
}

export function trackAddToCart(product, quantity = 1) {
  if (!hasAnalytics() || !window.gtag) {
    return;
  }

  window.gtag("event", "add_to_cart", eventPayload(product, quantity));
}

export function trackBeginCheckout(items, total) {
  if (!hasAnalytics() || !window.gtag) {
    return;
  }

  window.gtag("event", "begin_checkout", {
    currency: "INR",
    value: total,
    items: items.map((item) => ({
      item_id: String(item.id),
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  });
}
