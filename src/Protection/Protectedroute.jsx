import { Navigate } from "react-router-dom";
import { ROLES } from "../Constants/constant";
import { getToken, getUser, clearAuthData } from "../Utils/Auth";

const getDashboard = (role) => {
  if (role === ROLES.ADMIN) return "/admin/dashboard";
  if (role === ROLES.STUDENT) return "/student/dashboard";
  return "/login";
};

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const user = getUser();

  if (!token || !user) {
    clearAuthData();
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired(token)) {
    clearAuthData();
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboard(user.role)} replace />;
  }

  return children;
};

export default ProtectedRoute;