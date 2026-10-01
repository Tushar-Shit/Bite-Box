import { useState, useEffect } from "react";
import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import OrderCard from "../components/OrderCard";
import Loader from "../components/Loader";
import NoData from "../components/NoData";
import { io } from "socket.io-client";

const Order = () => {
  const [loader, setLoader] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let socket;

    const getOrderData = async () => {
      try {
        //============================= GET USER ORDERS =============================
        const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const { data } = await response.json();
        setOrders(data);
        setLoader(false);

        // ======================   SOCKET.IO CONNECTION   ======================
        socket = io(import.meta.env.VITE_API_URL, {
          withCredentials: true,
          autoConnect: true,
        });

        socket.on("connect", () => {
          console.log("Order list socket connected:", socket.id);
          //We can get the customerId from the first order. Every order belongs to the same logged-in customer.
          const customerId = data?.[0]?.customerId;
          if (customerId) {
            socket.emit("joinUser", customerId.toString());
            console.log("Joined customer room:", `user:${customerId}`);
          }
        });

        // ======================   REAL-TIME ORDER STATUS UPDATE   ======================
        socket.on("orderStatusUpdated", (updatedOrder) => {
          console.log("Real-time order update:", updatedOrder);

          if (!updatedOrder?.orderId) {
            return;
          }

          setOrders((previousOrders) => {
            return previousOrders.map((order) => {
              if (
                order.orderId?.toString() === updatedOrder.orderId?.toString()
              ) {
                return updatedOrder;
              }

              return order;
            });
          });
        });
      } catch (err) {
        console.log("Error fetching orders:", err);
        setLoader(false);
      }
    };

    getOrderData();

    //============================== CLEANUP =========================================
    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("orderStatusUpdated");
        socket.disconnect();
        console.log("Order list socket disconnected");
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <CustomNav text="Orders" />

      {loader && <Loader />}

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-3 px-2 flex flex-col gap-3">
        {!orders || (orders.length <= 0 && !loader) ? (
          <NoData text1="No orders yet" text2="Your orders will appear here" />
        ) : (
          orders?.map((order) => (
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
          ))
        )}
      </main>

      <BottomBar />
    </div>
  );
};

export default Order;
