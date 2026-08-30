import { useState,useEffect } from "react";
import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import OrderCard from "../components/OrderCard";
const Order = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
          credentials: "include",
        });
        const { data } = await response.json();
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrderData();
  }, []);
  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <CustomNav text="Orders" />
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-3 px-2 flex flex-col gap-3">
        {orders.map((order) => (
          <OrderCard 
          key={order.orderId}
          totalOrder={order}
          id={order._id}
          orderId={order.orderId}
          orderAmount={order.finalAmount}
          status={order.status}
          payMode={order.paymentMode}
          items={order.items}
          date_time={order.createdAt}
          />
        ))}

      
      </main>
      <BottomBar />
    </div>
  );
};

export default Order;
