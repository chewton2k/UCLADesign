import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const isLoggedIn = window.sessionStorage.getItem("UserLoggedIn"); 
    let user = null; 
    if (isLoggedIn === "true") { 
        user = true; 
    } else { 
        user = false;
    }
    return user ? <Outlet /> : <Navigate to="/signup" />
};

export default ProtectedRoutes;