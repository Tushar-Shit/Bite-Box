import { useState, useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import OrderCard from "../components/OrderCard";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = location.state;
  const foodItems = items.map((item) => ({
    foodId: item.foodId,
    image: item.foodId.image,
    name: item.foodId.name,
    unit: item.foodId.unit,
    available: item.foodId.available,
    quantity: item.quantity,
    price: item.price,
  }));
  // console.log(foodItems);
  const totalAmount = foodItems.reduce((acc, item) => item.price + acc, 0);
  const deliveryCharge = 20;

  const [customer, setCustomer] = useState({});
  const [customerName, setCustomerName] = useState(null);
  const [customerMobile, setCustomerMobile] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  let [updateAddress, setUpdateAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });

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
          return;
        }
        setCustomer(data);
        setCustomerMobile(data.mobile);
        setCustomerName(data.username);
        setDeliveryAddress(data.address1 ? data.address1 : data.address2);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [location.state.food, location.state.user]);

  const [updateMessage, setUpdateMessage] = useState(null);
  const registerOrder = async () => {
    console.log({});
    const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food: foodItems,
        deliveryCharge: deliveryCharge,
        amount: totalAmount,
        finalAmount: deliveryCharge + totalAmount,
        customerName: customerName,
        mobile: customerMobile,
        location: deliveryAddress,
      }),
    });
    const { message } = await response.json();
    setUpdateMessage(message);
    console.log(message);
  };

  // ======================================== Address update code  =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const edit = () => {
    setUpdateAddress(true);
    formData.name = customerName;
    formData.mobile = customerMobile;
    formData.address = deliveryAddress;
  };

  // const [newAddress, setNewAddress] = useState("");
  const handleSave = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() === "" ||
      formData.mobile.trim() === "" ||
      formData.address.trim() === ""
    ) {
      return;
    }
    setDeliveryAddress(formData.address);
    setCustomerMobile(formData.mobile);
    setCustomerName(formData.name);
    setUpdateAddress(null);
  };

  const closeForm = () => {
    setUpdateAddress(null);
  };
  // close success message and update form
  const close = () => {
    setUpdateMessage(null);
    navigate(-1);
  };
  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <Helmet>
        <title>BiteBox | Place your Order</title>
      </Helmet>
      <CustomNav text="Place Order" />
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-3 px-2 flex flex-col gap-3">
        {/*=================== delivery details ======================= */}
        <section className="bg-white rounded-2xl border border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
          <div className="flex items-center justify-between gap-1">
            <h2 className="text-xl font-bold text-zinc-900">Deliver to:</h2>
            <button onClick={edit} className="border p-1 rounded-lg ">
              Change
            </button>
          </div>

          {/* Address */}
          <div className="">
            <p className="text-lg font-semibold text-zinc-900 mt-1">
              {customerName}
            </p>
            <p className="text-sm text-zinc-500 flex gap-0.5">
              <Phone size={15} />
              {customerMobile}
            </p>
            <p className="text-sm text-zinc-500 flex gap-2">
              {deliveryAddress}
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
                key={item.name}
                className="flex gap-3 border-b border-zinc-200 last:border-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-25 h-15 rounded-xl object-cover shrink-0"
                />
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

        {/* payment options  */}
        <section className="bg-white rounded-2xl border border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-zinc-900">Payment Options</h2>
          </div>
          <p className="text-zinc-600">Cash on Delivery</p>
          <p className="text-zinc-600">Online Payment</p>
          <div className="flex justify-center">
            <button
              onClick={registerOrder}
              className="py-2 px-8 rounded-lg bg-[#2ec335] text-white cursor-pointer"
            >
              Pay ₹{totalAmount + deliveryCharge}
            </button>
          </div>
        </section>

        {/* payment section  */}
        <section className="h-50 flex justify-center mb-5"></section>
      </main>

      {/* success message  */}
      {updateMessage && (
        <section className="h-screen w-full absolute bg-[#000000]/40 flex items-center justify-center">
          <div className="h-50 px-4 text-center rounded-lg bg-white flex items-center justify-center relative">
            <span
              onClick={close}
              className="absolute top-3 right-4 text-xl font-bold cursor-pointer"
            >
              &#10007;
            </span>
            <p className="text-green-700">{updateMessage}</p>
          </div>
        </section>
      )}

      {/*=================== Edit Form ======================= */}
      {updateAddress && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <form
            onSubmit={handleSave}
            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-orange-100 mx-4"
          >
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold leading-6 text-slate-900">
                Update Details
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Where should we send your hot, fresh meal?
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative">
                <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Hungry Customer"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 transition-all
               placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div className="relative">
                <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wide">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 transition-all placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div className="relative">
                <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wide">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Flat/House no., Floor, Street name..."
                  rows={3}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 transition-all placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeForm}
                className="w-1/3 inline-flex justify-center rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 border border-red-100 transition-all hover:bg-red-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-2/3 inline-flex justify-center items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-green-600/20 transition-all hover:bg-green-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span>Save</span>
              </button>
            </div>
          </form>
        </section>
      )}
      <BottomBar />
    </div>
  );
};

export default Order;
