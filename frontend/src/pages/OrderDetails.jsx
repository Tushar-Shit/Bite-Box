import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import { useLocation } from "react-router-dom";
import {
  CalendarDays,
  Check,
  FileText,
  MapPin,
  Package,
  Phone,
  RefreshCcw,
  ShoppingBag,
  Wallet,
} from "lucide-react";

const OrderDetails = () => {
  const location = useLocation();
  const data = location.state;
// console.log(data)
  const date = new Date(data.createdAt);
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

  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <CustomNav text="Order Details" />
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-3 px-2 flex flex-col gap-3">
        {/* ==========================  ORDER SUMMARY ========================= */}
        <section className="border border-zinc-300 bg-white rounded-2xl  shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 mb-4">
          {/* Date + Time */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
            <CalendarDays size={18} className="text-pink-500" />
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{formattedTime}</span>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 mb-3">
            Order #{data.orderId}
          </h1>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            {data.status}
          </div>

          <p className="text-sm text-zinc-600 mt-3">
            Your order has been delivered successfully.
          </p>

          {/* ======================= ORDER TIMELINE ========================== */}
          <div className="mt-5 pt-5 border-t border-zinc-300">
            <div className="flex items-start justify-between">
              {/* Order Placed */}
              <TimelineStep
                icon={<FileText size={17} />}
                title="Order Placed"
                time="07:45 PM"
                active
              />

              {/* Line */}
              <div className="flex-1 h-0.5 bg-green-500 mt-5 mx-1" />

              {/* Preparing */}
              <TimelineStep
                icon={<ShoppingBag size={17} />}
                title="Preparing"
                time="07:50 PM"
                active
              />

              <div className="flex-1 h-0.5 bg-green-500 mt-5 mx-1" />

              {/* On the way */}
              <TimelineStep
                icon={<Package size={17} />}
                title="On the Way"
                time="08:05 PM"
                active
              />

              <div className="flex-1 h-0.5 bg-green-500 mt-5 mx-1" />

              {/* Delivered */}
              <TimelineStep
                icon={<Check size={17} />}
                title="Delivered"
                time="08:24 PM"
                active
                completed
              />
            </div>
          </div>
        </section>

        {/* =========================== ORDER ITEMS  ================================ */}
        <section className="bg-white rounded-2xl border border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-zinc-900">Order Items</h2>

            <span className="text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-100 px-3 py-1 rounded-lg">
              {data.items.length} items
            </span>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {data.items.map((item, index) => (
              <div
                key={item.name}
                className="flex gap-3 border-b border-zinc-200 last:border-0"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-25 h-15 rounded-xl object-cover shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-semibold text-zinc-900 text-sm">
                      {item.name}
                    </h3>

                    <span className="font-semibold text-zinc-900 text-sm">
                      ₹{item.price}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-500 mt-1">{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ========================  TOTAL ============================= */}
          <div className="border-t border-dashed border-zinc-600 mt-4 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center justify-between gap-4">
                <div className="">
                  <p className="text-xs text-zinc-500">Total Amount</p>
                  <p className="text-lg font-bold text-zinc-900">
                    ₹{data.amount}
                  </p>
                </div>
                +
                <div className="">
                  <p className="text-xs text-zinc-500">Delivery Charge</p>
                  <p className="text-lg font-bold text-zinc-900">
                    ₹{data.deliveryCharge}
                  </p>
                </div>
              </div>

              <div className="justify-self-end">
                <p className="text-xs text-zinc-700 font-bold">Grand Total</p>
                <div className="w- h- rounded-xl bg-pink-50 flex items-center justify-center">
                  <span className="text-pink-600 text-2xl font-bold">
                    ₹{data.finalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===========================DELIVERY DETAILS========================= */}
        <section className="bg-white rounded-2xl border border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-pink-50 flex items-center justify-center">
              <MapPin size={20} className="text-pink-500" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              Delivery Details
            </h2>
          </div>

          {/* Address */}
          <div className="">
            <p className="text-lg font-semibold text-zinc-900 mt-1">
              {data.customerName}
            </p>
            <p className="text-sm text-zinc-500 flex gap-0.5">
              <Phone size={15} />
              {data.mobile}
            </p>
            <p className="text-sm text-zinc-500 flex gap-2">{data.location}</p>
          </div>
        </section>

        {/* ========================= PAYMENT DETAILS ========================== */}
        <section className="bg-white rounded-2xl border border-zinc-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-50 flex items-center justify-center">
              <Wallet size={20} className="text-purple-500" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">Payment Details</h2>
          </div>

          <div className="flex gap-3">
            <div>
              <p className="text-sm text-zinc-500">Payment Method</p>
              <p className="font-semibold text-zinc-900 mt-1">
                {data.paymentMode}
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Paid on 50th june 2080
                03:45PM
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-100 my-5" />

          <div>
            <p className="text-sm text-zinc-500">Transaction ID</p>
            <p className="font-semibold text-zinc-900 mt-1 tracking-wide">
              XYZ Transaction id
            </p>
          </div>
        </section>

        {/* ======================= ORDER AGAIN  =============================== */}
        <section className="bg-white rounded-2xl border border-pink-300 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-zinc-500">Total Amount</p>
              <p className="text-xl font-bold text-zinc-900">
                ₹{data.finalAmount}
              </p>
            </div>

            <button className="flex-1 max-w-47.5 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition">
              <RefreshCcw size={18} />
              Order Again
            </button>
          </div>
        </section>
      </main>
      <BottomBar />
    </div>
  );
};

/*======================= TIMELINE COMPONENT ==================================== */
const TimelineStep = ({
  icon,
  title,
  time,
  active = false,
  completed = false,
}) => {
  return (
    <div className="flex flex-col items-center text-center w-12 shrink-0">
      <div
        className={`
          w-10 h-10 rounded-full
          flex items-center justify-center
          border
          ${
            completed
              ? "bg-green-50 border-green-200 text-green-600"
              : active
                ? "bg-pink-50 border-pink-200 text-pink-500"
                : "bg-zinc-50 border-zinc-200 text-zinc-400"
          }
        `}
      >
        {icon}
      </div>

      <p
        className={`
          text-[11px] font-medium mt-2 whitespace-nowrap
          ${completed ? "text-green-600" : "text-zinc-800"}
        `}
      >
        {title}
      </p>
      <p className="text-[10px] text-zinc-500 mt-1 whitespace-nowrap">{time}</p>
    </div>
  );
};

export default OrderDetails;
