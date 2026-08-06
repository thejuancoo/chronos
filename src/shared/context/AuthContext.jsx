import { useState, useContext, createContext, useEffect } from "react";
import apiInstance from "../../api/api";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token')

            !token ? setLoading(false) : null

            try{
                const {data} = await apiInstance("/auth/login")
                setAuth(data)
            }catch(error){
                console.log(error)
            }
        }
        authUser()
    }, [])
}