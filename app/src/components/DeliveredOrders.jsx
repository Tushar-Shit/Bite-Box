import React from "react";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { NoOrder, TabStrip } from "./Atomic";
export default function DeliveredOrders({ orders }) {
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Delivered Orders</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Successfully completed orders.
          </p>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
          {deliveredOrders.length} Orders
        </span>
      </div>

      {deliveredOrders.length > 0 ? (
        <div className="overflow-x-auto max-h-[calc(100vh-350px)] overflow-y-auto">
          <table className="w-full min-w-225">
            <TabStrip
              address={true}
              itemsName={true}
              amount={true}
              payment={true}
              // status={true}
              time={true}
              name="Delivered Time"
            />

            <tbody className="divide-y divide-gray-100">
              {deliveredOrders.map((order) => (
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

                  <td className="lg:w-50 px-2 py-3">
                    <p className="font-normal text-gray-800">
                      {order.location}
                    </p>
                  </td>

                  <td className="lg:w-55 px-2 py-3">
                    <span className="text-xs font-semibold text-gray-600">
                      {order.items?.map((item) => item.name).join(", ") ||
                        "N/A"}
                    </span>
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

                  {/* <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td> */}

                  <td className="px-4 py-3">
                    <p className="text-[12px] text-gray-500 font-medium whitespace-nowrap">
                      {format(order.createdAt, "d MMM, yyyy hh:mm a")}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoOrder
          icon={CheckCircle}
          title="No delivered orders"
          message="No orders have been delivered yet."
        />
      )}
    </div>
  );
}
