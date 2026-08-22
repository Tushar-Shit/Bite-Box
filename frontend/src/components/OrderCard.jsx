import { CalendarDays, CreditCard, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const OrderCard = () => {
  const status = "Delivered";

  const statusStyle = {
    Delivered: {
      wrapper: "bg-emerald-50 border-emerald-200 text-emerald-600",
    },
    Cancelled: {
      wrapper: "bg-red-50 border-red-200 text-red-600",
    },
    Rejected: {
      wrapper: "bg-orange-50 border-orange-200 text-orange-600",
    },
    Pending: {
      wrapper: "bg-amber-50 border-amber-200 text-amber-600",
    },
    Preparing: {
      wrapper: "bg-blue-50 border-blue-200 text-blue-600",
    },
    "On the way": {
      wrapper: "bg-violet-50 border-violet-200 text-violet-600",
    },
  };

  const currentStatus = statusStyle[status] || statusStyle.Pending;

  return (
    <div className="w-full border border-[#c7c7c7] rounded-xl p-2 bg-[#f3f3f3] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      {/* Card Header */}
      <div className="flex items-center justify-between px-1 pb-2">
        {/* Order ID */}
        <span className="text-lg font-bold text-zinc-900 truncate">
          #OT62HC729XWS7E
        </span>

        {/* Status */}
        <span
          className={`shrink-0 px-2.5 py-1 rounded-full border text-xs font-semibold ${currentStatus.wrapper}`}
        >
          {status}
        </span>
      </div>

      {/* Main Content */}
      <div className="border-y border-dashed border-zinc-300 py-2">
        <div className="flex gap-3 items-stretch">
          {/* Image */}
          <div className="w-30 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300"
              alt="Fish Finger"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Information */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Date + Time */}
            <div className="flex items-center gap-1.5 text-xs text-[#686868] mb-2">
              <CalendarDays size={15} className="text-[#ff338b]" />

              <span>18 November, 2026</span>

              <span className="text-zinc-400">•</span>

              <span>07:45 PM</span>
            </div>

            {/* Items */}
            <div className="space-y-1">
              {/* Item 1 */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-zinc-800 truncate">
                  Fish Finger
                </span>

                <span className="shrink-0 min-w-7 h-6 px-2 flex items-center justify-center rounded-md bg-white border border-zinc-200 text-xs font-semibold text-zinc-700">
                  ×3
                </span>
              </div>

              
              {/* More Items */}
              <span className="inline-block mt-0.5 text-xs font-semibold text-[#ff338b]">
                + 2 more items
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-2 flex items-center justify-between gap-3">
        {/* Total */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center">
            <span className="text-pink-600 font-bold text-lg">₹</span>
          </div>

          <div>
            <p className="text-[11px] text-zinc-500">Total Amount</p>

            <p className="font-bold text-zinc-900">₹550</p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
            <CreditCard size={17} className="text-purple-500" />
          </div>

          <div>
            <p className="text-[11px] text-zinc-500">Payment</p>

            <p className="text-sm font-semibold text-zinc-900">Online</p>
          </div>
        </div>

        {/* View */}
        <Link
          to="/orders/xyeheiw6711"
          className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-600 text-sm font-semibold transition hover:bg-pink-100 active:scale-95"
        >
          <span>View</span>

          <ChevronRight size={17} />
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
