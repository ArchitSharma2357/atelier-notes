import { toast } from "react-hot-toast";
import { useCartStore } from "../store/useCartStore";
import { trackAddToCart, trackBeginCheckout } from "../utils/analytics";
import { resolveAssetPath } from "../utils/assetPath";

export function useCartActions() {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const addToCart = (product, quantity = 1) => {
    addItem(product, quantity);
    trackAddToCart(product, quantity);
    
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-none pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-black/10`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 object-cover"
                src={resolveAssetPath(product.image)}
                alt={product.name}
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-ink">
                Added to cart
              </p>
              <p className="mt-1 text-sm text-stone">
                {product.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-black/10">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              window.location.hash = '#/cart';
            }}
            className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.12em] text-bronze hover:text-ink transition-colors focus:outline-none"
          >
            View Cart
          </button>
        </div>
      </div>
    ), { duration: 3000 });
  };

  const beginCheckout = (total) => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    trackBeginCheckout(items, total);
    
    const checkoutToast = toast.loading("Preparing your order...");
    
    // Simulate a brief checkout process
    setTimeout(() => {
      toast.dismiss(checkoutToast);
      toast.success(
        (t) => (
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Order Placed Successfully!</span>
            <span className="text-sm opacity-90">Thank you for your purchase. A confirmation has been sent.</span>
            <button 
              onClick={() => {
                toast.dismiss(t.id);
                clearCart();
                window.location.hash = '#/';
              }}
              className="mt-2 text-xs font-bold uppercase tracking-widest text-white underline underline-offset-4"
            >
              Back to Home
            </button>
          </div>
        ),
        { duration: 6000 }
      );
    }, 1500);
  };

  return {
    addToCart,
    beginCheckout,
    clearCart,
  };
}
