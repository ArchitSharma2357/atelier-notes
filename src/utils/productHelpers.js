export function getRelatedProducts(products, product, count = 3) {
  return products
    .filter(
      (candidate) => candidate.id !== product.id && candidate.category === product.category,
    )
    .slice(0, count);
}

