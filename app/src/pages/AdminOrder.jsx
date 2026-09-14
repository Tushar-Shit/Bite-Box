import React, { useEffect, useRef, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  Menu,
  Search,
  Users,
  LogOut,
  Calendar,
  ChevronDown,
} from "lucide-react";

// Separate sections
import Loader from "../components/Loader";
import AllOrders from "../components/AllOrders";
import CancelledOrders from "../components/CancelledOrders";
import PendingOrders from "../components/PendingOrders";
import PreparingOrders from "../components/PreparingOrders";
import OutForDeliveryOrders from "../components/OutOfDeliveryOrders";
import DeliveredOrders from "../components/DeliveredOrders";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [loader, setLoader] = useState(null);
  const dateInputRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openCalendar = () => {
    dateInputRef.current?.showPicker();
  };

  useEffect(() => {
    const getOrders = async () => {
      setLoader(true);
      try {
        const currentDate = new Date().toISOString().split("T")[0];
        const queryDate = selectedDate || currentDate;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/orders`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: queryDate,
            }),
          },
        );

        const { data } = await response.json();
        setOrders(data || []);
        setLoader(false);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setLoader(false);
      }
    };

    getOrders();
  }, [selectedDate]);

  const orderCounts = {
    "All Orders": orders.length,
    Pending: orders.filter((order) => order.status === "Pending").length,
    Preparing: orders.filter((order) => order.status === "Preparing").length,
    "Out for Delivery": orders.filter(
      (order) => order.status === "Out for Delivery",
    ).length,
    Delivered: orders.filter((order) => order.status === "Delivered").length,
    Cancelled: orders.filter(
      (order) => order.status === "Cancelled" || order.status === "Rejected",
    ).length,
  };

  const tabs = [
    "All Orders",
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case "Pending":
        return <PendingOrders orders={orders} />;

      case "Preparing":
        return <PreparingOrders orders={orders} />;

      case "Out for Delivery":
        return <OutForDeliveryOrders orders={orders} />;

      case "Delivered":
        return <DeliveredOrders orders={orders} />;

      case "Cancelled":
        return <CancelledOrders orders={orders} />;

      case "All Orders":
      default:
        return <AllOrders orders={orders} />;
    }
  };
  //search order functionality,
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    const key = searchQuery.toLocaleLowerCase().trim();
    console.log(key);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/orders/search/${key}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const { data } = await response.json();
    // console.log(data);
    setOrders(data || []);
    // setLoader(false);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="bg-[#f8fafc] flex h-screen w-screen overflow-hidden text-slate-800 font-sans antialiased">
      {/* ====================================================== SIDEBAR ====================================================== */}
      {sidebarOpen && <AdminSidebar onclick={toggleSidebar} />}

      {/* ====================================================== MAIN ====================================================== */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* ==================================================== NAVBAR ==================================================== */}
        <header
          className={`bg-white/80 backdrop-blur-md border-b border-slate-300 h-19 flex items-center justify-between px-6 shrink-0 transition-all duration-300 ${sidebarOpen ? "lg:px-6" : "lg:px-10"}`}
        >
          {/* Logo / Menu */}
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <div
                className="p-2 hover:bg-slate-50 rounded-xl transition cursor-pointer group"
                onClick={toggleSidebar}
              >
                <Menu className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Orders
              </h2>
              <p className="text-[12px] text-slate-400 font-medium mt-0.5">
                Manage and track all your restaurant orders.
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search orders, customers, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl pl-11 pr-4 py-2.5 text-xs font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 shadow-inner transition-all duration-200"
              />
            </div>
          </div>

          {/* Admin Profile & Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition active:scale-98">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold shadow-sm">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <h5 className="text-[13px] font-bold text-slate-800 leading-none mb-0.5">
                  Tushar
                </h5>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  Super Admin
                </span>
              </div>
            </button>

            <button className="hidden md:flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50 transition font-medium active:scale-95">
              <LogOut className="w-4 h-4" />
              <span className="text-xs font-bold">Logout</span>
            </button>
          </div>
        </header>

        {/* ==================================================== CONTENT ==================================================== */}
        <main className="flex-1 overflow-y-auto p-6 lg:py-4  space-y-4 bg-slate-50/50">
          {/* ================================================== DATE + TITLE ================================================== */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                Order Details for &nbsp;
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Today"}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                View and manage restaurant orders.
              </p>
            </div>

            {/* Date Picker Button */}
            <div className="relative">
              <button
                type="button"
                onClick={openCalendar}
                className="bg-white border border-slate-200 shadow-sm px-3.5 py-2 rounded-xl text-[11px] font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Today"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="absolute right-3.5 opacity-0 pointer-events-none"
              />
            </div>
          </div>

          {/* ================================================== STATUS NAVIGATION ================================================== */}
          <div className="bg-white border border-slate-200/60 shadow-sm rounded-xl p-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {orderCounts[tab]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ================================================== ACTIVE ORDER SECTION ================================================== */}
          <section className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 min-h-120">
            {loader ? (
              <Loader message="Loading orders..." />
            ) : (
              renderActiveSection()
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
