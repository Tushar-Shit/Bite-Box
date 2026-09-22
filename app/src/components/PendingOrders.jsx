import { useState } from "react";
import { Check, X, Clock } from "lucide-react";
import { format } from "date-fns";
import { NoOrder, TabStrip } from "./Atomic";
export default function PendingOrders({ orders }) {
  // console.log(orders)
  const pendingOrders = orders.filter((order) => order.status === "Pending");
  // const itemsName = orders.filter((order) => order.items).flatMap((order) => order.items.map((item) => item.name));
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  // console.log(itemsName);
  const handle = async (order, code) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/orders`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.orderId,
          code: code,
        }),
      },
    );

    const data = await response.json();
    if (data.message === "Order Accepted") {
      setAcceptedOrders((prevAcceptedOrders) => [...prevAcceptedOrders, order]);
    } else if (data.message === "Order Rejected") {
      setRejectedOrders((prevRejectedOrders) => [...prevRejectedOrders, order]);
    }
  };

  const [reasonBox, setReasonBox] = useState(false);
  const handleReason = (e) => {
    // e.preventDefault();
    console.log("hello");
    setReasonBox(true);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden relative">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Pending Orders</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            New orders waiting for approval.
          </p>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-orange-50 text-orange-600">
          {pendingOrders.length} Orders
        </span>
      </div>

      {pendingOrders.length > 0 ? (
        <div className="max-h-[calc(100vh-350px)] overflow-y-auto overflow-x-auto">
          <table className="w-full min-w-275">
            <TabStrip
              items={true}
              itemsName={true}
              amount={true}
              payment={true}
              time={true}
              name="Order Time"
              action={true}
            />

            <tbody className="divide-y divide-gray-100">
              {pendingOrders.map((order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-gray-50/60 transition text-sm"
                >
                  {/* Order */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.items[0]?.image}
                        alt=""
                        loading="lazy"
                        className="w-9 h-9 rounded-lg object-cover bg-gray-50 shrink-0"
                      />

                      <div>
                        <p className="font-bold text-gray-900">
                          {order.orderId}
                        </p>
                        <p className="text-[9px] text-gray-400 mt-0.5">Order</p>
                      </div>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3">
                    <p className="text-[15px] font-bold text-gray-800">
                      {order.customerName}
                    </p>

                    <p className="text-gray-400 mt-0.5">{order.mobile}</p>
                  </td>

                  {/* Items */}
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">
                      {order.items?.length || 0}
                    </p>
                  </td>

                  {/* Items name */}
                  <td className="lg:w-65 px-1 py-3">
                    <span className="text-xs font-semibold text-gray-600">
                      {order.items?.map((item) => item.name).join(", ") ||
                        "N/A"}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3">
                    <span className="font-bold text-gray-900">
                      {order.amount}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-3">
                    <span
                      className={
                        order.method === "Online"
                          ? "text-emerald-500 font-medium"
                          : "text-amber-600 font-medium"
                      }
                    >
                      {order.paymentMode}
                    </span>
                  </td>
                  {/* Received */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />

                      {format(new Date(order.createdAt), "d MMM, yyyy hh:mm a")}
                    </div>
                  </td>

                  {acceptedOrders.includes(order) ? (
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[13px] text-emerald-600 font-bold px-2.5 py-1.5 rounded-full">
                        Accepted
                      </span>
                    </td>
                  ) : rejectedOrders.includes(order) ? (
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[13px] text-red-600 font-bold px-2.5 py-1.5 rounded-full">
                        Rejected
                      </span>
                    </td>
                  ) : (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* Reject */}
                        <button
                          type="button"
                          onClick={() => handle(order, "Rejected")}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-200 active:scale-95 transition  cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                          Reject
                        </button>

                        {/* Accept */}
                        <button
                          type="button"
                          onClick={() => handle(order, "Accepted")}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-emerald-200 active:scale-95 transition cursor-pointer
                        bg-emerald-50 text-emerald-600 border border-emerald-200"
                        >
                          <Check className="w-3 h-3" />
                          Accept
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoOrder
          icon={Clock}
          title="No pending orders"
          message="New orders will appear here when they are placed."
        />
      )}
      {/* <div className="h-full w-full absolute top-0 bg-black/20 flex items-center justify-center">
        <form className="p-4 px-8 rounded-2xl bg-white">
          <p className="text-lg font-bold mb-4">
            Pick your reason for rejection:
          </p>
          <div className="flex gap-1 items-center mb-1">
            <input
              id="reason1"
              value="Out of stock"
              name="reason"
              type="radio"
              placeholder="describe your thought"
              className="rounded-4xl cursor-pointer"
            />
            <label htmlFor="reason1" className="cursor-pointer">
              Out of stock.
            </label>
          </div>
          <div className="flex gap-1 items-center mb-1">
            <input
              id="reason2"
              value="Unreachable Delivery Location"
              name="reason"
              type="radio"
              placeholder="describe your thought"
              className="rounded-4xl cursor-pointer"
            />
            <label htmlFor="reason2" className="cursor-pointer">
              Unreachable Delivery Location.
            </label>
          </div>
          <div className="flex gap-1 items-center mb-1">
            <input
              id="reason3"
              value="Restaurent is about to close"
              name="reason"
              type="radio"
              placeholder="describe your thought"
              className="rounded-4xl cursor-pointer"
            />
            <label htmlFor="reason3" className="cursor-pointer">
              Restaurent is about to close
            </label>
          </div>
          <div className="flex gap-1 items-center mb-1">
            <input
              id="reason4"
              value="Invalid Order Details"
              name="reason"
              type="radio"
              placeholder="describe your thought"
              className="rounded-4xl cursor-pointer"
            />
            <label htmlFor="reason4" className="cursor-pointer">
              Invalid Order Details
            </label>
          </div>
          <div className="flex gap-1 items-center mb-1">
            <input
              id="reason5"
              value="Others"
              name="reason"
              type="radio"
              placeholder="describe your thought"
              className="rounded-4xl cursor-pointer"
            />
            <label htmlFor="reason5" className="cursor-pointer">
              Others
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Submit
          </button>
        </form>
      </div> */}
    </div>
  );
}
