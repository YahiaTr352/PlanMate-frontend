import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

export const RedirectIfAuth = () => {
    const cookie = Cookie();
    const userId = cookie.get("userId");

    return userId ? <Navigate to="/home" replace/> : <Outlet/>
}