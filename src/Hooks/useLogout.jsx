import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../Utils/Auth";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuthData();
    navigate("/login");
  };

  return logout;
};