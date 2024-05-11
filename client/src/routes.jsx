import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  
/*   if (user) return <h1>Loading...</h1>; */
  if (!isAuthenticated/*  && !loading */) return <Navigate to="/" replace />;
  return <Outlet />;
};