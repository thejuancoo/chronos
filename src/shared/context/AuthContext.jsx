import { useState, createContext, useEffect } from "react";
import axios from "axios";
import {
    registerRequest,
    loginRequest,
    profileRequest,
    updateProfileRequest,
    forgotPasswordRequest,
    updatePasswordRequest
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
            
            try {
                const user = await profileRequest()
                setAuth(user)

            } catch(error){
                setErrorUser(error)
                removeToken()
                setAuth(null)

            } finally {
                setLoading(false)
            }
        }
        authUser()
    }, [])

    const registerUser = async (dataUser) => {
        try {
            setErrorUser(null);
            setLoading(true);

            const result = await registerRequest(dataUser);

            return result;
        } catch (error) {
            if(axios.isAxiosError(error) && error.code === 'ERR_NETWORK'){
                setErrorUser('No se pudo conectar con el servidor')
            } else {
                setErrorUser(error);
            }
            
            throw error;
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

    const updateProfile = async (dataUser) => {
        try {
            const response = await updateProfileRequest(dataUser)
            
            return response
        } catch (error) {
            setErrorUser(error)
        }
    }

    const updatePassword = async (dataPassword) => {
        try {
            setErrorUser(null)
            setLoading(true)
            const response = await updatePasswordRequest(dataPassword)
            
            return response
        } catch (error) {
            setErrorUser(error)
        } finally {
            setLoading(false)
        }
    }


    const closeSession = () => {
        removeToken()
        setAuth(null)
    }

    const recoveryPassword = async (emailUser) => {
        try {
            setErrorUser(null)
            setLoading(true)

            const response = await forgotPasswordRequest(emailUser)
            return response
        } catch (error) {
            setErrorUser("Ocurrio un error, intenta de nuevo")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                errorUser,
                registerUser,
                login,
                closeSession,
                updateProfile,
                recoveryPassword,
                updatePassword
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