import { Outlet, Navigate, useLocation } from "react-router"
import useAuth from "../../hooks/useAuth"

export default function ProtectedRoute() {
    const { auth, loading} = useAuth()
    const location = useLocation()
    const isAuthenticated = Object.keys(auth).length > 0

    if(loading)
        return <div>Cargando...</div>

    if(!isAuthenticated){
        return (
            <Navigate
                to={"/"}
                replace
                state={{from: location}}
            />
        )
    }

    return <Outlet/>
}
