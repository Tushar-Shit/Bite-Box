import React from "react";
import { Utensils, Check } from "lucide-react";
import { format } from "date-fns";
import { NoOrder, TabStrip } from "./Atomic";
export default function PreparingOrders({ orders }) {
  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing",
  );

  const [outForDelivery, setOutForDelivery] = React.useState([]);
  const handle = async (order, status) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/preparing-orders`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.orderId,
          status: status,
        }),
      },
    );
    const { message } = await response.json();
    // console.log(message);
    if (message === "out of delivery") {
      setOutForDelivery([...outForDelivery, order]);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Preparing Orders</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Orders currently being prepared.
          </p>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-blue-50 text-blue-600">
          {preparingOrders.length} Orders
        </span>
      </div>

      {preparingOrders.length > 0 ? (
        <div className="max-h-[calc(100vh-350px)] overflow-y-auto overflow-x-auto">
          <table className="w-full min-w-225">
            <TabStrip
              status={true}
              time={true}
              name="Preparing Starts"
              action={true}
            />

            <tbody className="divide-y divide-gray-100">
              {preparingOrders.map((order) => (
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
                    <p className="text-[12px] text-gray-500 font-medium whitespace-nowrap">
                      {format(order.createdAt, "d MMM, yyyy hh:mm a")}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                      <Utensils className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {outForDelivery.includes(order) ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full text-[#a77707]  border border-orange-200">
                        <Check className="w-3 h-3" />
                        Out for Delivery
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handle(order, "Out for Delivery")}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-emerald-200 active:scale-95 transition cursor-pointer
                        bg-emerald-50 text-emerald-600 border border-emerald-200"
                      >
                        Ready For Delivery
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
          icon={Utensils}
          title="No preparing orders"
          message="There are no orders currently being prepared."
        />
      )}
    </div>
  );
}
