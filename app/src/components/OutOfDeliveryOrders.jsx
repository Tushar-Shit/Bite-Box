import React, { useState } from "react";
import { Truck, Check } from "lucide-react";
import { format } from "date-fns";
import { NoOrder, TabStrip } from "./Atomic";

export default function DeliveryOrders({ orders }) {
  const deliveryOrders = orders.filter(
    (order) => order.status === "Out for Delivery",
  );
  console.log(orders);
  const [delivered, setDelivered] = useState(null);
  const handle = async (order, code) => {
    console.log(order.orderId, code);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/delivered`,
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
    const { message } = await response.json();
    console.log(message);
    if (message === "Order Delivered") {
      setDelivered(true);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Out for Delivery</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Orders currently on their way to customers.
          </p>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-purple-50 text-purple-600">
          {deliveryOrders.length} Orders
        </span>
      </div>

      {deliveryOrders.length > 0 ? (
        <div className="overflow-x-auto max-h-[calc(100vh-350px)] overflow-y-auto">
          <table className="w-full min-w-225">
            <TabStrip
              address={true}
              amount={true}
              payment={true}
              status={true}
              action={true}
            />

            <tbody className="divide-y divide-gray-100">
              {deliveryOrders.map((order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-gray-50/60 transition text-sm"
                >
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

                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">
                      {order.customerName}
                    </p>
                    <p className="text-gray-400 mt-0.5">{order.mobile}</p>
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-normal text-gray-800">
                      {order.location}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-bold text-gray-900">
                      {order.amount}
                    </span>
                  </td>

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

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                      <Truck className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>

                  {/* Accept */}
                  <td className="px-4 py-3">
                    {delivered ? (
                      <button
                        type="button"
                        onClick={() => handle(order, "Delivered")}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-emerald-200 active:scale-95 transition cursor-pointer
                        bg-emerald-50 text-emerald-600 border border-emerald-200"
                      >
                        <Check className="w-3 h-3" />
                        Item Delivered Successfully
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handle(order, "Delivered")}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-emerald-200 active:scale-95 transition cursor-pointer
                        bg-emerald-50 text-emerald-600 border border-emerald-200"
                      >
                        <Check className="w-3 h-3" />
                        Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoOrder
          icon={Truck}
          title=" No delivery orders"
          message="There are no orders currently out for delivery."
        />
      )}
    </div>
  );
}
