import { useState, createContext, useEffect } from "react";
import {
    registerRequest,
    loginRequest,
    profileRequest 
} from "../../api/auth";
import { 
    saveToken,
    getItem,
    removeToken 
} from "../../service/token";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errorUser, setErrorUser] = useState(null)

    useEffect(() => {
        const authUser = async () => {
            
            if(!getItem()) {
                setLoading(false)
                return
            }
            
            try{
                const user = await profileRequest()
                setAuth(user)
            }catch(error){
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        authUser()
    }, [])

    const registerUser = async (dataUser) => {
        try {
            setErrorUser(null)
            setLoading(true)
            const result = await registerRequest(dataUser)

            return result
        } catch (error) {
            setErrorUser("Hubo un error al registrar el usuario")
        } finally {
            setLoading(false)
        }
    }

    const login = async (credentials) => {
        const token = await loginRequest(credentials)
        saveToken(token)

        const user = await profileRequest()
        setAuth(user)

        return user
    }

    const closeSession = () => {
        removeToken()
        setAuth(null)
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                registerUser,
                login,
                closeSession 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext