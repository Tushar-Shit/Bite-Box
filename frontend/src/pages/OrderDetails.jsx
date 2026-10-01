import { useEffect, useState } from "react";
import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import {
  CircleAlert,
  CalendarDays,
  Check,
  FileText,
  MapPin,
  Package,
  Phone,
  RefreshCcw,
  ShoppingBag,
  Wallet,
  Star,
} from "lucide-react";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const data = location.state;

  const [informationText, setInformationText] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showCancel, setShowCancel] = useState(false);
  const [cancelPopup, setCancelPopup] = useState(false);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  //======================= DATE + TIME ===========================================
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

  //======================= UPDATE INFORMATION TEXT ===============================
  const updateInformationText = (status) => {
    switch (status || "Pending") {
      case "Pending":
        setInformationText("Your order has been placed successfully.");
        break;
      case "Preparing":
        setInformationText(" Your order is preparing with love. ");
        break;
      case "Out for Delivery":
        setInformationText("Your order is out for delivery.");
        break;
      case "Delivered":
        setInformationText("Your order has been delivered successfully. ");
        break;
      case "Rejected":
        setInformationText("Your order is rejected by the restaurant.");
        break;
      case "Cancelled":
        setInformationText("Your order has been cancelled successfully.");
        break;
      default:
        setInformationText("");
        break;
    }
  };

  //======================= FETCH ORDER + SOCKET.IO ===============================

  useEffect(() => {
    if (!data?.orderId) return;

    //SOCKET.IO CONNECTION
    const socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      autoConnect: true,
    });
    //REAL-TIME ORDER STATUS UPDATE
    const handleOrderStatusUpdated = (updatedOrder) => {
      if (
        !updatedOrder ||
        updatedOrder.orderId?.toString() !== data.orderId?.toString()
      ) {
        return;
      }
      setOrder(updatedOrder);
      updateInformationText(updatedOrder.status);
    };
    //UPDATE ORDER STATUS WHEN BACKEND SEND SOMETHING ON orderStatusUpdated
    socket.on("orderStatusUpdated", handleOrderStatusUpdated);

    const getOrder = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/order/status/${data.orderId}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }

        const { order: fetchedOrder, reviews } = await response.json();
        // console.log("Fetched order:", fetchedOrder);
        console.log("Fetched reviews:", reviews);
        setOrder(fetchedOrder);
        setReviews(reviews);
        updateInformationText(fetchedOrder?.status);

        // Join the logged-in customer's Socket.IO room
        if (fetchedOrder?.customerId) {
          const customerId = fetchedOrder.customerId.toString();

          const joinUserRoom = () => {
            socket.emit("joinUser", customerId);

            console.log("Joined customer room:", `user:${customerId}`);
          };

          if (socket.connected) {
            joinUserRoom();
          } else {
            socket.once("connect", joinUserRoom);
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    getOrder();

    return () => {
      socket.off("orderStatusUpdated", handleOrderStatusUpdated);

      socket.disconnect();
    };
  }, [data.orderId]);

  // checking if the order is delivered and reviews are already submitted
  useEffect(() => {
    if (
      order?.status === "Delivered" &&
      reviews?.length > 0 &&
      reviews[0]?.orderId?.toString() === order?._id?.toString()
    ) {
      setFeedback(reviews);
    }
  }, [order, reviews]);

  // HIDE CANCEL BUTTON ON OUTSIDE CLICK OR SCROLL
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".cancel-button")) {
        setShowCancel(false);
      }
    };

    const handleScroll = () => {
      setShowCancel(false);
    };

    document.addEventListener("click", handleOutsideClick);
    const main = document.querySelector("main");
    main?.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      main?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //======================= CANCEL ORDER ==========================================

  const handleCancel = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/status/${data.orderId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Cancelled",
          }),
        },
      );

      // const { message } = await response.json();

      // if (message === "order cancelled successfully") {
      //   setCancelPopup(false);
      // } else {
      setCancelPopup(false);
      // }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setCancelPopup(false);
    }
  };

  //======================= TOTAL REVIEW & RATING SYSTEM ================================================
  const [selectedItems, setSelectedItems] = useState([]);
  const [processRating, setProcessRating] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);

  // track the check boxes for each item in the order and store the selected items in an array
  const handleItemSelection = (itemId) => {
    // console.log("Selected item ID:", itemId);
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };
  // console.log("Selected items:", selectedItems);
  // track the star/rating count and enable the submit button
  useEffect(() => {
    if (rating > 0 || review.trim() !== "") {
      setSubmitButton(true);
    } else {
      setSubmitButton(false);
    }
  }, [rating, review]);

  // ======================= SUBMIT REVIEW =========================================
  const handleReview = async () => {
    if (!rating || rating === 0) {
      console.error("Invalid rating");
      setProcessRating(true);
      return;
    }
    setProcessRating(true);
    try {
      // console.log(selectedItems);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/add-review`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedItems,
            rating,
            review,
            orderId: order._id,
          }),
        },
      );
      const { message } = await response.json();
      if (message === "success") console.log("rating done");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      setProcessRating(false);
    }
  };

  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <CustomNav text="Order Details" />

      {cancelPopup && (
        <section className="h-screen w-full z-10 absolute bg-[#000000]/40 flex items-center justify-center">
          <div className="py-5 px-4 text-center rounded-lg bg-white">
            <p className="text-lg">Do you really wants to cancel this order?</p>

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                onClick={handleCancel}
                className="py-1 px-8 bg-gray-400 text-white rounded-lg cursor-pointer"
              >
                Yes
              </button>

              <button
                onClick={() => {
                  setCancelPopup(false);
                }}
                className="py-1 px-8 bg-green-700 text-white rounded-lg cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </section>
      )}

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-3 px-2 flex flex-col gap-3">
        {/* ==========================  ORDER SUMMARY ========================= */}

        <section className="border border-zinc-300 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 mb-2">
          {/* Date + Time */}

          <div className="flex items-center justify-between text-sm text-zinc-500 mb-3">
            <div className="flex gap-1">
              <CalendarDays size={18} className="text-pink-500" />

              <span>{formattedDate}</span>
              <span>•</span>
              <span>{formattedTime}</span>
            </div>

            {order?.status === "Delivered" ||
            order?.status === "Rejected" ||
            order?.status === "Cancelled" ||
            order?.status === "Out for Delivery" ? null : (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCancel(true);
                }}
              >
                <CircleAlert
                  size={20}
                  color="grey"
                  className="cursor-pointer"
                />
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            {order?.status === "Rejected" || order?.status === "Cancelled" ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />

                {order?.status}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

                {order?.status}
              </div>
            )}

            <span
              className={`cancel-button bg-red-50 p-1 px-3 border border-red-100 rounded-xl text-red-500 cursor-pointer ${
                showCancel ? "block" : "hidden"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setShowCancel(false);
                setCancelPopup(true);
              }}
            >
              Cancel
            </span>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 mb-3">
            Order #{data.orderId}
          </h1>

          <p className="text-sm text-zinc-600 mt-3">{informationText}</p>

          {/* ======================= ORDER TIMELINE ========================== */}

          <div className="mt-5 pt-2 border-t border-zinc-300">
            <div className="flex items-start justify-between">
              {order?.status === "Rejected" || order?.status === "Cancelled" ? (
                <>
                  <TimelineStep
                    icon={<FileText size={17} />}
                    title="Order Placed"
                    time=""
                    active
                  />

                  <div className="flex-1 h-0.5 bg-red-500 mt-5 mx-1" />

                  <TimelineStep
                    icon={<ShoppingBag size={17} />}
                    title={order?.status}
                    time=""
                    active
                  />
                </>
              ) : (
                <>
                  {/* order placed */}

                  <TimelineStep
                    icon={<FileText size={17} />}
                    title="Order Placed"
                    time=""
                    completed
                  />

                  {/* line after order placed */}

                  {order?.status === "Preparing" ||
                  order?.status === "Out for Delivery" ||
                  order?.status === "Delivered" ? (
                    <div className="flex-1 h-0.5 bg-green-500 mt-5 mx-1" />
                  ) : (
                    <div className="flex-1 h-0.5 bg-gray-300 mt-5 mx-1" />
                  )}

                  {/* preparing */}

                  <TimelineStep
                    icon={<ShoppingBag size={17} />}
                    title="Preparing"
                    time=""
                    completed={
                      order?.status === "Preparing" ||
                      order?.status === "Out for Delivery" ||
                      order?.status === "Delivered"
                    }
                  />

                  {/* line after preparing */}

                  {order?.status === "Out for Delivery" ||
                  order?.status === "Delivered" ? (
                    <div className="flex-1 h-0.5 bg-green-500 mt-5 mx-1" />
                  ) : (
                    <div className="flex-1 h-0.5 bg-gray-300 mt-5 mx-1" />
                  )}

                  {/* On the way */}

                  <TimelineStep
                    icon={<Package size={17} />}
                    title="On the Way"
                    time=""
                    completed={
                      order?.status === "Out for Delivery" ||
                      order?.status === "Delivered"
                    }
                  />

                  {/* line after on the way */}

                  {order?.status === "Delivered" ? (
                    <div className="flex-1 h-0.5 bg-green-500 mt-5 mx-1" />
                  ) : (
                    <div className="flex-1 h-0.5 bg-gray-300 mt-5 mx-1" />
                  )}

                  {/* Delivered */}

                  <TimelineStep
                    icon={<Check size={17} />}
                    title="Delivered"
                    time=""
                    completed={order?.status === "Delivered"}
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* ==========================  Customer Feedback ========================= */}
        {order?.status === "Delivered" && !feedback && (
          <section className="bg-white rounded-2xl border border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
            <h3 className="font-bold">Would you like to rate the food?</h3>
            <form className=" mt-2 flex flex-col gap-2">
              {order?.items?.map((item) => (
                <label
                  key={item.foodId}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 cursor-pointer hover:bg-gray-50 transition"
                >
                  {/* {console.log(item)} */}
                  {/* {console.log(item.foodId)} */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />

                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-800">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(item.foodId)}
                    onChange={() => handleItemSelection(item.foodId)}
                    value={item._id}
                    className="h-4 w-4 cursor-pointer accent-black"
                  />
                </label>
              ))}
            </form>

            {selectedItems.length > 0 && (
              <div className="mt-2">
                <h2 className="text-md font-bold text-zinc-900 mb-4">
                  Rating & Feedback
                </h2>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={32}
                      strokeWidth={1.5}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer transition ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex flex-col mt-4">
                  <textarea
                    placeholder="Write a review..."
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-zinc-200 rounded-xl resize-none outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200"
                  />

                  {submitButton && (
                    <button
                      disabled={processRating}
                      onClick={handleReview}
                      className="self-end border py-1.5 px-5 rounded-lg mt-3 bg-emerald-50 border-emerald-200 text-green-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {feedback && (
          <section className="bg-white rounded-2xl border border-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
            <div className="text-lg font-bold text-zinc-900">
              Your Reviews for this Order
            </div>
            <div className="mt-2 text-gray-600 font-semibold flex flex-col gap-3">
              {feedback.map((item) => (
                <div
                  className="flex gap-2 border border-gray-300 rounded-lg px-2 py-1"
                  key={item._id}
                >
                  {console.log(item)}
                  <div classname="">
                    <img
                      src={item.food_belong.image}
                      alt={item.food_belong.name}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-zinc-900">
                      {item.food_belong.name}
                    </h2>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <Star
                          size={20}
                          fill={`${index <= item.rating ? "#ff9d00" : "#D3D3D3"}`}
                          color={`${index <= item.rating ? "#ff9d00" : "#D3D3D3"}`}
                        />
                      ))}
                    </div>
                    {item.comment && (
                      <p className="text-sm text-zinc-500">"{item.comment}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================== ORDER ITEMS ================================ */}

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

          {/* TOTAL */}

          <div className="border-t border-dashed border-zinc-600 mt-4 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-zinc-500">Total Amount</p>

                  <p className="text-lg font-bold text-zinc-900">
                    ₹{data.amount}
                  </p>
                </div>
                +
                <div>
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

        {/* =========================== DELIVERY DETAILS ========================= */}

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

          <div>
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
                Paid on <span>{formattedDate}</span>
                <span className="px-1">•</span>
                <span>{formattedTime}</span>
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

        {/* ======================= ORDER AGAIN =============================== */}

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
