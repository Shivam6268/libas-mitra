import useAuthStatus from "../hooks/useUserAuthStatus"
import Loder from "../components/Loder"
import { Navigate, Outlet } from "react-router-dom"

const PrivateAuthComponents = () => {
  
    const {authLoading, isAuthenticated} = useAuthStatus()

    if(authLoading){
        return <Loder loadingMessage={"Checking If You are Authorised..."} />
    }

    return isAuthenticated ? <Outlet/> : <Navigate to={"/login"} />
}

export default PrivateAuthComponents