import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLogin, children }) {
  const token = localStorage.getItem("access_token");

  // Izinkan akses jika isLogin true di Redux ATAU ada token di localStorage
  if (!isLogin && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
