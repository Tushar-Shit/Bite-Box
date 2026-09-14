import { ShoppingBag } from "lucide-react";

const NoOrder = ({
  icon: Icon = ShoppingBag,
  title = "No Orders",
  message = "There are no orders for this date.",
}) => {
  return (
    <div className="h-89 text-center flex flex-col items-center justify-center">
      <Icon className="w-15 h-15 text-gray-300 mx-auto mb-2" />

      <p className="text-lg font-semibold text-gray-500">{title}</p>

      <p className="text-md text-gray-400 mt-1">{message}</p>
    </div>
  );
};

const TabStrip = ({
  address,
  items,
  itemsName,
  amount,
  payment,
  time,
  status,
  action,
  name,
  reason
}) => {
  return (
    <thead className="sticky -top-0.5 z-10 bg-gray-50">
      <tr className="text-[13px] border-y border-gray-100">
        <th className="text-left px-5 py-3  font-bold text-gray-400 uppercase tracking-wide">
          Order_Id
        </th>
        <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
          Customer
        </th>
       {address &&<th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
          Delivery Address
        </th>}
        {items && (
          <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
            Items
          </th>
        )}
        {itemsName && (
          <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
            Item Name
          </th>
        )}
        {amount && (
          <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
            Amount
          </th>
        )}
        {payment && (
          <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
            Payment
          </th>
        )}
        {time && (
          <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
           {name}
          </th>
        )}
        {status && (
          <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
            Status
          </th>
        )}
        {reason && (
          <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
            Reason
          </th>
        )}
        {action && (
          <th className="text-left px-4 py-3  font-bold text-gray-400 uppercase tracking-wide">
            Action
          </th>
        )}
      </tr>
    </thead>
  );
};
export { NoOrder, TabStrip };
