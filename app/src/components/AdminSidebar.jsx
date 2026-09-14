import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  Tags,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

const AdminSidebar = ({ onclick }) => {
  const { pathname } = useLocation();
  // console.log(pathname);

  return (
    <div className="w-64 bg-[#111827] text-gray-400 flex flex-col justify-between shrink-0 h-full">
      <div>
        {/* Logo */}

        <div className="p-5 flex items-center justify-between gap-3 border-b border-gray-800/60 relative">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF451D] text-white p-2 rounded-xl flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>

            <div>
              <h1 className="text-white font-bold text-base leading-tight">
                BiteBox
              </h1>

              <p className="text-[11px] text-gray-500 font-medium">
                Admin Panel
              </p>
            </div>
          </div>
          <span className="text-4xl cursor-pointer" onClick={onclick}>
            &times;
          </span>
        </div>

        {/* Navigation */}

        <nav className="mt-5 px-3 space-y-1">
          {[
            {
              name: "Dashboard",
              icon: LayoutDashboard,
              href: "/",
            },
            {
              name: "Orders",
              icon: ShoppingBag,
              href: "/admin/orders",
            },
            {
              name: "Menu / Food",
              icon: Utensils,
              href: "/admin/foods",
            },
            {
              name: "Categories",
              icon: Tags,
              href: "/admin/categories",
            },
            {
              name: "Customers",
              icon: Users,
              href: "/admin/customers",
            },
            {
              name: "Analytics",
              icon: BarChart3,
              href: "/admin/analytics",
            },
            {
              name: "Settings",
              icon: Settings,
              href: "/admin/settings",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`${pathname === item.href ? "flex items-center gap-3 bg-[#FF451D] text-white px-4 py-2.5 rounded-xl font-medium text-sm transition" : "flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-gray-800/60 hover:text-white transition group text-sm"}`}
              >
                <div className="flex items-center gap-3 ">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  <span>{item.name}</span>
                </div>

                {pathname !== item.href && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sidebar */}

      <div className="p-3 space-y-3">
        <div className="bg-gray-800/40 border border-gray-800/50 p-3 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FF451D]/10 text-[#FF451D] flex items-center justify-center shrink-0">
            <Utensils className="w-4 h-4" />
          </div>

          <div className="overflow-hidden">
            <h4 className="text-white text-xs font-semibold truncate">
              BiteBox Restaurant
            </h4>

            <p className="text-[10px] text-gray-500 mt-0.5 truncate">
              Delicious food, delivered with love ❤️
            </p>
          </div>
        </div>

        <a
          href="#logout"
          className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition text-xs font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default AdminSidebar;
