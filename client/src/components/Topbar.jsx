import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Assuming user data is stored in state.user.data after login
  const { data } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Welcome back,{" "}
          <Link
            to="/profile"
            className="text-emerald-600 font-bold hover:underline"
          >
            {data?.name || "User"}
          </Link>
        </h1>

        {/* 📍 Location Label */}
        {data?.city && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 animate-in fade-in slide-in-from-left-4 duration-500">
            <span className="text-xs font-black uppercase tracking-widest">
              📍 {data.city}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 shadow-sm transition-all duration-200"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </header>
  );
}
