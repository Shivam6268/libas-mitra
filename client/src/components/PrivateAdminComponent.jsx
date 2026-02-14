import useAdminAuthStatus from "../hooks/useAdminAuthStatus"
import Loder from "./Loder"
import { Navigate, Outlet } from 'react-router-dom'


const PrivateAdminComponent = () => {

    
    const { authLoading, isAdmin } = useAdminAuthStatus()


    if (authLoading) {
        return (
            <Loder loadingMessage={"Checking If You are Authorised..."} />
        )
    }

    return isAdmin ? <Outlet /> : <Navigate to={"/auth/profile"} />

}

export default PrivateAdminComponent