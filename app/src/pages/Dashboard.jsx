import React, { useEffect, useRef } from "react";
import ChartJS from "chart.js/auto";

import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  Tags,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Calendar,
  ArrowUp,
  Clock,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

/* -------------------------------------------------------------------------- */
/* DATA                                                                        */
/* -------------------------------------------------------------------------- */

const navigationItems = [
  { name: "Orders", icon: ShoppingBag, href: "#orders" },
  { name: "Menu / Food", icon: Utensils, href: "#menu-food" },
  { name: "Categories", icon: Tags, href: "#categories" },
  { name: "Customers", icon: Users, href: "#customers" },
  { name: "Analytics", icon: BarChart3, href: "#analytics" },
  { name: "Settings", icon: Settings, href: "#settings" },
];

const statCards = [
  {
    title: "Total Orders",
    value: "24",
    icon: ShoppingBag,
    color: "bg-red-50 text-red-500",
    change: "+ 26.3%",
  },
  {
    title: "Total Revenue",
    value: "₹2,840",
    icon: Utensils,
    color: "bg-emerald-50 text-emerald-500",
    change: "+ 18.7%",
  },
  {
    title: "New Customers",
    value: "7",
    icon: Users,
    color: "bg-indigo-50 text-indigo-500",
    change: "+ 40.0%",
  },
  {
    title: "Food Items Sold",
    value: "46",
    icon: Utensils,
    color: "bg-amber-50 text-amber-500",
    change: "+ 15.0%",
  },
  {
    title: "Pending Orders",
    value: "6",
    icon: Clock,
    color: "bg-blue-50 text-blue-500",
    label: "Currently",
  },
];

const orderStatus = [
  {
    name: "Pending",
    count: 6,
    pct: "25.0%",
    color: "bg-amber-400",
    chartColor: "#FBBF24",
  },
  {
    name: "Preparing",
    count: 5,
    pct: "20.8%",
    color: "bg-blue-400",
    chartColor: "#60A5FA",
  },
  {
    name: "Out for Delivery",
    count: 4,
    pct: "16.7%",
    color: "bg-purple-500",
    chartColor: "#A78BFA",
  },
  {
    name: "Delivered",
    count: 8,
    pct: "33.3%",
    color: "bg-emerald-500",
    chartColor: "#34D399",
  },
  {
    name: "Cancelled",
    count: 1,
    pct: "4.2%",
    color: "bg-red-400",
    chartColor: "#F87171",
  },
];

const recentOrders = [
  {
    id: "#BB1256",
    name: "John Doe",
    time: "31 May, 2025 • 09:15 AM",
    price: "₹320",
    status: "Pending",
    badge: "bg-amber-50 text-amber-600",
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=100",
  },
  {
    id: "#BB1255",
    name: "Sarah Smith",
    time: "31 May, 2025 • 09:05 AM",
    price: "₹620",
    status: "Preparing",
    badge: "bg-blue-50 text-blue-600",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100",
  },
  {
    id: "#BB1254",
    name: "Michael Johnson",
    time: "31 May, 2025 • 08:50 AM",
    price: "₹450",
    status: "Out for Delivery",
    badge: "bg-purple-50 text-purple-600",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=100",
  },
  {
    id: "#BB1253",
    name: "Emily Davis",
    time: "31 May, 2025 • 08:30 AM",
    price: "₹280",
    status: "Delivered",
    badge: "bg-emerald-50 text-emerald-600",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100",
  },
];

const topSellingItems = [
  {
    rank: 1,
    title: "Cheese Burger",
    count: "12 orders",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100",
  },
  {
    rank: 2,
    title: "Chicken Pizza",
    count: "9 orders",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100",
  },
  {
    rank: 3,
    title: "French Fries",
    count: "6 orders",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100",
  },
  {
    rank: 4,
    title: "Pasta Alfredo",
    count: "5 orders",
    img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=100",
  },
];

const totalOrders = orderStatus.reduce((total, item) => total + item.count, 0);

/* -------------------------------------------------------------------------- */
/* STAT CARD                                                                   */
/* -------------------------------------------------------------------------- */

function StatCard({ card }) {
  const Icon = card.icon;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}
      >
        <Icon className="w-4 h-4" />
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-900">{card.value}</h3>

        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
          {card.title}
        </p>

        {card.change ? (
          <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
            <ArrowUp className="w-2.5 h-2.5" />

            {card.change}

            <span className="text-gray-400 font-normal ml-0.5">
              vs yesterday
            </span>
          </p>
        ) : (
          <p className="text-[10px] text-gray-400 mt-1 font-medium">
            {card.label}
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DASHBOARD                                                                   */
/* -------------------------------------------------------------------------- */

export default function Dashboard() {
  const salesChartRef = useRef(null);
  const statusChartRef = useRef(null);

  useEffect(() => {
    if (!salesChartRef.current || !statusChartRef.current) {
      return;
    }

    /* ====================================================================== */
    /* SALES CHART                                                            */
    /* ====================================================================== */

    const salesCtx = salesChartRef.current.getContext("2d");

    const revenueGradient = salesCtx.createLinearGradient(0, 0, 0, 240);

    revenueGradient.addColorStop(0, "rgba(16, 185, 129, 0.20)");

    revenueGradient.addColorStop(1, "rgba(16, 185, 129, 0)");

    const salesChart = new ChartJS(salesCtx, {
      type: "line",

      data: {
        labels: ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM", "11 PM"],

        datasets: [
          {
            label: "Revenue (₹)",

            data: [150, 280, 420, 760, 980, 1140, 1020],

            borderColor: "#10B981",
            borderWidth: 2.5,

            backgroundColor: revenueGradient,

            fill: true,
            tension: 0.4,

            pointBackgroundColor: "#10B981",
            pointBorderWidth: 0,
            pointRadius: 3,
            pointHoverRadius: 6,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
          intersect: false,
          mode: "index",
        },

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            backgroundColor: "#111827",
            padding: 10,
            displayColors: false,

            callbacks: {
              label: (context) => ` Revenue: ₹${context.parsed.y}`,
            },
          },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },

            border: {
              display: false,
            },

            ticks: {
              color: "#9CA3AF",

              font: {
                size: 11,
              },
            },
          },

          y: {
            min: 0,
            max: 1200,

            border: {
              display: false,
            },

            ticks: {
              stepSize: 300,

              color: "#9CA3AF",

              font: {
                size: 11,
              },

              callback: (value) => {
                if (value === 0) {
                  return "₹0";
                }

                return value >= 1000 ? `₹${value / 1000}K` : `₹${value}`;
              },
            },

            grid: {
              color: "#F3F4F6",
            },
          },
        },
      },
    });

    /* ====================================================================== */
    /* ORDER STATUS CHART                                                     */
    /* ====================================================================== */

    const statusCtx = statusChartRef.current.getContext("2d");

    const statusChart = new ChartJS(statusCtx, {
      type: "doughnut",

      data: {
        labels: orderStatus.map((item) => item.name),

        datasets: [
          {
            data: orderStatus.map((item) => item.count),

            backgroundColor: orderStatus.map((item) => item.chartColor),

            borderWidth: 0,

            cutout: "78%",

            hoverOffset: 4,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            enabled: true,

            callbacks: {
              label: (context) => {
                const value = context.parsed;

                const percentage = ((value / totalOrders) * 100).toFixed(1);

                return `${context.label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    /* ====================================================================== */
    /* CLEANUP                                                                */
    /* ====================================================================== */

    return () => {
      salesChart.destroy();
      statusChart.destroy();
    };
  }, []);

  return (
    <div className="bg-[#f9fafb] flex h-screen w-screen overflow-hidden text-gray-800 font-sans">
      {/* ================================================================== */}
      {/* SIDEBAR                                                           */}
      {/* ================================================================== */}

      <AdminSidebar />

      {/* ================================================================== */}
      {/* MAIN VIEWPORT                                                     */}
      {/* ================================================================== */}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TOP NAVBAR */}

        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button
              type="button"
              aria-label="Toggle sidebar"
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for orders, customers, items..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-1.5 text-xs focus:outline-none focus:border-gray-300 transition placeholder-gray-400"
              />

              <Search className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* User Options */}

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="relative w-9 h-9 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 hover:bg-gray-100 transition"
            >
              <Bell className="w-4 h-4" />

              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2.5 pl-3 border-l border-gray-200"
            >
              <div className="w-8 h-8 rounded-full bg-[#FF451D]/10 text-[#FF451D] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>

              <div className="text-left hidden md:block">
                <h5 className="text-xs font-bold text-gray-800 leading-none">
                  Admin
                </h5>

                <span className="text-[10px] text-gray-400 font-medium">
                  Super Admin
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
            </button>
          </div>
        </header>

        {/* ================================================================== */}
        {/* MAIN CONTENT                                                       */}
        {/* ================================================================== */}

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Dashboard Header */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Dashboard 👋
              </h2>

              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                Here's what's happening with your business today.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-600 bg-emerald-50 text-[11px] font-bold px-2 py-0.5 rounded-md">
                Today
              </span>

              <button
                type="button"
                className="bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-700 shadow-sm flex items-center gap-2 hover:bg-gray-50 transition"
              >
                <Calendar className="w-3.5 h-3.5 text-gray-400" />

                <span>Today (31 May, 2025)</span>

                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* ================================================================= */}
          {/* STAT CARDS                                                        */}
          {/* ================================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {statCards.map((card) => (
              <StatCard key={card.title} card={card} />
            ))}
          </div>

          {/* ================================================================= */}
          {/* CHARTS                                                            */}
          {/* ================================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Sales Overview */}

            <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-3">
                <h4 className="text-xs font-bold text-gray-900">
                  Sales Overview
                </h4>

                <div className="flex items-center gap-4 text-[11px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-0.5 bg-emerald-500 rounded-full block" />

                    <span className="text-gray-400">Revenue (₹)</span>
                  </div>

                  <button
                    type="button"
                    className="bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg text-gray-600 flex items-center gap-1"
                  >
                    <span>Today</span>

                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="h-56 relative w-full">
                <canvas ref={salesChartRef} />
              </div>
            </div>

            {/* Order Status */}

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="border-b border-gray-50 pb-3 mb-3">
                <h4 className="text-xs font-bold text-gray-900">
                  Order Status Overview
                </h4>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <div className="relative w-32 h-32 shrink-0">
                  <canvas ref={statusChartRef} />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-gray-400 font-medium">
                      Total
                    </span>

                    <span className="text-lg font-bold text-gray-900">
                      {totalOrders}
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-1.5 text-[11px] font-medium">
                  {orderStatus.map((row) => (
                    <div
                      key={row.name}
                      className="flex items-center justify-between py-0.5 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${row.color}`} />

                        <span className="text-gray-400">{row.name}</span>
                      </div>

                      <div className="font-bold text-gray-800">
                        {row.count}

                        <span className="text-gray-400 font-normal ml-0.5">
                          ({row.pct})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RECENT ORDERS + TOP SELLING                                      */}
          {/* ================================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Recent Orders */}

            <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-3">
                <h4 className="text-xs font-bold text-gray-900">
                  Recent Orders
                </h4>

                <a
                  href="#all-orders"
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  View All Orders →
                </a>
              </div>

              <div className="flex-1 divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 first:pt-1 last:pb-1"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={order.img}
                        alt=""
                        loading="lazy"
                        className="w-10 h-10 object-cover rounded-xl shrink-0 bg-gray-50"
                      />

                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-gray-900 truncate">
                          Order {order.id}
                        </h5>

                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                          {order.name}
                        </p>

                        <p className="text-[9px] text-gray-400 mt-0.5">
                          {order.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <span className="text-xs font-bold text-gray-900">
                        {order.price}
                      </span>

                      <span
                        className={`text-[10px] font-bold px-3 py-1 rounded-full text-center w-24 ${order.badge}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Items */}

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-3">
                <h4 className="text-xs font-bold text-gray-900">
                  Top Selling Items
                </h4>

                <a
                  href="#all-items"
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  View All Items →
                </a>
              </div>

              <div className="space-y-3.5 flex-1 flex flex-col justify-between py-1">
                {topSellingItems.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black">
                        {item.rank}
                      </span>

                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="w-9 h-9 object-cover rounded-xl bg-gray-50"
                      />

                      <div>
                        <h5 className="text-xs font-bold text-gray-900">
                          {item.title}
                        </h5>

                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                          {item.count}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
