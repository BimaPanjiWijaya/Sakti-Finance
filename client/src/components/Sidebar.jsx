import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import {
  HomeIcon,
  CreditCardIcon,
  SparklesIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    { name: "Transactions", path: "/transactions", icon: CreditCardIcon },
    { name: "Insight", path: "/insights", icon: SparklesIcon },
    { name: "Profile", path: "/profile", icon: UserIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <span className="text-white font-bold text-xl">SF</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            SAKTI FINANCE
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-100"
                  : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
              }`
            }
          >
            <item.icon
              className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`}
            />
            <span className="tracking-tight">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Pro Badge / Upgrade Placeholder */}
      <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-gray-900 to-slate-800 rounded-2xl p-4 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <SparklesIcon className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
            Pro Feature
          </span>
        </div>
        <p className="text-[11px] text-gray-400 leading-tight mb-3">
          Dapatkan laporan bulanan otomatis & sinkronisasi bank.
        </p>
        <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-xs font-black rounded-lg transition-colors">
          UPGRADE NOW
        </button>
      </div>
    </aside>
  );
}
