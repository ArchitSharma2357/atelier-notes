import { useEffect, useMemo, useState } from "react";
import productsData from "../data/products.json";

let cachedProducts = null;

export function useCatalog() {
  const [products, setProducts] = useState(cachedProducts ?? []);
  const [isLoading, setIsLoading] = useState(!cachedProducts);

  useEffect(() => {
    if (cachedProducts) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      cachedProducts = productsData;
      setProducts(productsData);
      setIsLoading(false);
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(productsData.map((product) => product.category))],
    [],
  );

  return {
    products,
    categories,
    isLoading,
  };
}

