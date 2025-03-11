import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const isLoggedIn = window.sessionStorage.getItem("UserLoggedIn"); 
    const user = isLoggedIn; 
    return user ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoutes;