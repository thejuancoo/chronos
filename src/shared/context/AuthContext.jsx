import { useState, createContext, useEffect } from "react";
import apiInstance from "../../api/api";
import { 
    loginRequest,
    profileRequest
} from "../../api/auth";
import { saveToken } from "../../service/token";

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

    const login = async (credentials) => {
        const token = await loginRequest(credentials)
        saveToken(token)

        const user = await profileRequest()
        setAuth(user)

        return user
    }

    const closeSession = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{auth, setAuth, loading, setLoading, login, closeSession}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext