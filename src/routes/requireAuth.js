import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
    const cookie = Cookie();
    const userId = cookie.get("userId");

    return userId ? <Outlet/> : <Navigate to="/login" replace/>
}