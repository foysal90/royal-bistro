import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { replace } from "wd/lib/commands";


const AdminRoutes = ({children}) => {

    const {user, loading } = useAuth()
    const [isAdmin] = useAdmin()
    const location = useLocation()

    if (loading) {
        return <span className="loading loading-ring loading-lg"></span>
    }
    if (user && isAdmin) {
        return children;
        
    }
    return <Navigate to='/login' state={{from: location}} replace />
  
};

export default AdminRoutes;