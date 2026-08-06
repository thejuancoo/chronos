import { useState, useContext, createContext, useEffect } from "react";
import apiInstance from "../../api/api";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token')

            if(!token) {
                setLoading(false)
                return
            }

            try{
                const {data} = await apiInstance("/auth/profile")
                setAuth(data)
            }catch(error){
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        authUser()
    }, [])

    const closeSession = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{auth, setAuth, loading, setLoading, closeSession}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext