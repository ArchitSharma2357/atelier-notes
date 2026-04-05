import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";

const mockOrders = [
  {
    id: "ORD-7294",
    date: "March 24, 2026",
    status: "Delivered",
    total: "₹2,450.00",
    items: [
      { name: "Renaissance Acrylic Fountain Pen", quantity: 1 },
      { name: "Handmade Cotton Paper Notebook", quantity: 2 },
    ],
  },
  {
    id: "ORD-8102",
    date: "April 02, 2026",
    status: "In Transit",
    total: "₹1,120.00",
    items: [
      { name: "Jinhao 599-A Fountain Pen", quantity: 1 },
      { name: "Sticky Note Paper Flags", quantity: 3 },
    ],
  },
];

export default function MyOrdersPage() {
  return (
    <div className="page-shell page-frame">
      <SectionHeader
        eyebrow="Account"
        title="Your Orders"
        copy="Review your past purchases and track current shipments. Each piece tells a story of craftsmanship and careful selection."
      />

      <div className="mt-12 space-y-8">
        {mockOrders.length > 0 ? (
          mockOrders.map((order) => (
            <div key={order.id} className="border border-black/10 bg-white/70 shadow-sm overflow-hidden">
              <div className="bg-porcelain/50 px-6 py-4 border-b border-black/10 flex flex-wrap justify-between items-center gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Order Number</p>
                  <p className="font-display text-lg text-ink">#{order.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Date Placed</p>
                  <p className="font-semibold text-ink">{order.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Total Amount</p>
                  <p className="font-semibold text-ink">{order.total}</p>
                </div>
                <div>
                  <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blush/30 text-ink'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="px-6 py-6">
                <ul className="divide-y divide-black/5">
                  {order.items.map((item, index) => (
                    <li key={index} className="py-3 flex justify-between items-center">
                      <span className="text-sm text-stone font-medium">
                        {item.name} <span className="text-[10px] ml-2 text-stone/60">× {item.quantity}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-end">
                  <button className="text-xs font-bold uppercase tracking-widest text-ink border-b border-ink pb-0.5 hover:text-stone hover:border-stone transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            title="No orders yet"
            copy="It seems you haven't placed any orders with us yet. Explore our collection of fine writing tools and journals."
            actionLabel="Start Shopping"
            actionTo="/products"
          />
        )}
      </div>
    </div>
  );
}
