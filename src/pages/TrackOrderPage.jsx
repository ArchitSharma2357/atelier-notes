import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { Search } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingInfo({
        id: orderId,
        status: "In Transit",
        estimatedDelivery: "April 08, 2026",
        currentLocation: "New Delhi Sorting Center",
        events: [
          { time: "April 04, 2026 10:20 AM", location: "New Delhi Sorting Center", message: "Processed at sorting facility" },
          { time: "April 03, 2026 04:45 PM", location: "Jaipur Fulfillment Center", message: "Arrived at distribution hub" },
          { time: "April 02, 2026 09:00 AM", location: "Jaipur Fulfillment Center", message: "Shipped from warehouse" },
          { time: "April 01, 2026 11:30 PM", location: "Order Received", message: "We've received your order and are preparing it." },
        ],
      });
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="page-shell page-frame">
      <SectionHeader
        eyebrow="Support"
        title="Track Your Parcel"
        copy="Follow your journey from our workshop to your desk. Enter your order number below to see real-time updates."
      />

      <div className="mt-12 max-w-2xl mx-auto">
        <form onSubmit={handleTrack} className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Order ID (e.g., ORD-8102)"
              className="w-full h-14 border border-black/10 bg-white px-6 py-4 text-sm font-semibold text-ink placeholder:text-stone/50 outline-none focus:border-ink transition-colors"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="h-14 px-8 border border-ink bg-ink text-ivory text-[11px] font-bold uppercase tracking-widest hover:bg-stone hover:border-stone transition-all flex items-center gap-2 disabled:bg-stone/50 disabled:border-transparent"
          >
            {isSearching ? "Searching..." : (
              <>
                <Search size={16} />
                Track
              </>
            )}
          </button>
        </form>

        {trackingInfo ? (
          <div className="mt-12 border border-black/10 bg-white/70 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-8 space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Order Number</p>
                  <p className="mt-1 font-display text-2xl text-ink">#{trackingInfo.id}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Estimated Delivery</p>
                  <p className="mt-1 font-semibold text-ink text-lg">{trackingInfo.estimatedDelivery}</p>
                </div>
              </div>

              <div className="relative border-t border-black/10 pt-8">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-stone mb-6">Tracking Timeline</p>
                 <div className="space-y-8">
                   {trackingInfo.events.map((event, index) => (
                     <div key={index} className="flex gap-4">
                       <div className="flex flex-col items-center">
                         <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-ink' : 'bg-stone/30'}`} />
                         {index !== trackingInfo.events.length - 1 && (
                           <div className="w-px h-full bg-black/10 my-1" />
                         )}
                       </div>
                       <div className="space-y-1 pb-4">
                         <p className={`text-sm font-bold uppercase tracking-wider ${index === 0 ? 'text-ink' : 'text-stone/60'}`}>
                           {event.message}
                         </p>
                         <div className="flex gap-3 text-xs text-stone">
                           <span className="font-semibold">{event.time}</span>
                           <span>•</span>
                           <span>{event.location}</span>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        ) : !isSearching && orderId ? (
           <p className="mt-8 text-center text-sm text-stone italic">
             Ready to track your package? Hit the button above.
           </p>
        ) : null}
      </div>
    </div>
  );
}
