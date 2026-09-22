import { CalendarDays, CreditCard, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { exportString } from "node:ffi";

const OrderCard = ({
  id,
  orderId,
  orderAmount,
  status,
  payMode,
  items,
  date_time,
  totalOrder,
}) => {
  let orderItems;
  let remain = 0;
  if (items.length > 3) {
    orderItems = items.slice(0, 2);
    remain = items.length - 2;
  } else {
    orderItems = items;
  }
  const date = new Date(date_time);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

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
    <Link
      to={`/orders/${orderId}`}
      state={totalOrder}
      className="w-full border border-[#c7c7c7] rounded-xl p-2 bg-[#f3f3f3] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-1 pb-2">
        {/* Order ID */}
        <span className="text-lg font-bold text-zinc-900 truncate">
          #{orderId}
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
              src={items[0].image}
              alt="Fish Finger"
              className="w-full h-full max-h-25 object-cover rounded-xl"
            />
          </div>

          {/* Information */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Date + Time */}
            <div className="flex items-center gap-1.5 text-xs text-[#686868] mb-2">
              <CalendarDays size={15} className="text-[#ff338b]" />
              <span>{formattedDate}</span>
              <span className="text-zinc-400">•</span>
              <span>{formattedTime}</span>
            </div>

            {/* Items */}
            {orderItems.map((item) => (
              <FoodItem
                key={item.name}
                name={item.name}
                quantity={item.quantity}
              />
            ))}
            {remain > 0 && (
              <span className="inline-block mt-0.5 text-xs font-semibold text-[#ff338b]">
                + {remain} more items
              </span>
            )}
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

            <p className="font-bold text-zinc-900">₹{orderAmount}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
            <CreditCard size={17} className="text-purple-500" />
          </div>

          <div>
            <p className="text-[11px] text-zinc-500">Payment</p>

            <p className="text-sm font-bold text-zinc-900">{payMode}</p>
          </div>
        </div>

        {/* View */}
        <p
          // to={`/orders/${orderId}`}
          // state={totalOrder}
          className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-600 text-sm font-semibold transition hover:bg-pink-100 active:scale-95"
        >
          <span>View</span>

          <ChevronRight size={17} />
        </p>
      </div>
    </Link>
  );
};

const FoodItem = ({ name, quantity }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-zinc-800 truncate">{name}</span>
        <span className="shrink-0 min-w-7 h-6 px-2 flex items-center justify-center rounded-md bg-white border border-zinc-200 text-xs font-semibold text-zinc-700">
          ×{quantity}
        </span>
      </div>
    </div>
  );
};
export default OrderCard;
