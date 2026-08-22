import { useState, useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import OrderCard from "../components/OrderCard";
import { useLocation } from "react-router-dom";
const Order = () => {
  const location = useLocation();
  const { items } = location.state;
  const [foodItems, setFoodItems] = useState(items);
  const totalAmount = foodItems.reduce((acc, item) => item.price + acc, 0);
  const deliveryCharge = 20;

  const [customer, setCustomer] = useState({});
  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();
        if (data.code === "NU" || data.code === "NL") {
          console.log(data.message);
          setLoader(false);
          return;
        }
        setCustomer(data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [location.state.food, location.state.user]);
  //   console.log(customer);

  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <CustomNav text="Place Order" />
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-3 px-2 flex flex-col gap-3">
        {/*=================== delivery details ======================= */}
        <section className="bg-white rounded-2xl border border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
          <div className="flex items-center justify-between gap-1">
            <h2 className="text-xl font-bold text-zinc-900">Deliver to:</h2>
            <button className="border p-1 rounded-lg">Change</button>
          </div>

          {/* Address */}
          <div className="">
            <p className="text-lg font-semibold text-zinc-900 mt-1">
              {customer.username}
            </p>
            <p className="text-sm text-zinc-500 flex gap-0.5">
              <Phone size={15} />
              {customer.mobile}
            </p>
            <p className="text-sm text-zinc-500 flex gap-2">
              {customer.address1 ? customer.address1 : customer.address2}
            </p>
          </div>
        </section>

        {/*=================== Order Summary ======================= */}
        <section className="bg-white rounded-2xl border border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-zinc-900">Order Summary</h2>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {foodItems.map((item, index) => (
              <div
                key={item.foodId.name}
                className="flex gap-3 border-b border-zinc-200 last:border-0"
              >
                <img
                  src={item.foodId.image}
                  alt={item.foodId.name}
                  className="w-25 h-15 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-semibold text-zinc-900 text-sm">
                      {item.foodId.name}
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
                    ₹{totalAmount}
                  </p>
                </div>
                +
                <div className="">
                  <p className="text-xs text-zinc-500">Delivery Charge</p>
                  <p className="text-lg font-bold text-zinc-900">
                    ₹{deliveryCharge}
                  </p>
                </div>
              </div>

              <div className="justify-self-end">
                <p className="text-xs text-zinc-700 font-bold">Grand Total</p>
                <div className="w- h- rounded-xl bg-pink-50 flex items-center justify-center">
                  <span className="text-pink-600 text-2xl font-bold">
                    ₹{totalAmount + deliveryCharge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* payment section  */}
        <section className="h-50 flex justify-center mb-5">
            <button className="py-2 px-8 rounded-lg bg-[#2bea35]/70 text-white">Pay</button>
        </section>
      </main>
      <BottomBar />
    </div>
  );
};

export default Order;
