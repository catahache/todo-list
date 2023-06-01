import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const RequireAuth = () => {
    const { auth } = useSelector((state: RootState) => state.authData);
    const location = useLocation();
    return auth.token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;