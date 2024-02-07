import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext)
  const location = useLocation()
    if (loading) {
        return <span className="loading loading-ring loading-lg bg-red-600  h-48 ml-52 mt-32"></span>
        // return <progress className="progress w-56 bg-red-600"></progress>
        
    }
    if (user) {
        return children
        
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
        
    
};

export default ProtectedRoutes;