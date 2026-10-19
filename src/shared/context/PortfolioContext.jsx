import { createContext, useContext, useEffect, useState } from "react";
import { 
    createPortfolio,
    getAllPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById
} from "../../service/portfolioService";
import useAuth from "../hooks/useAuth";

const PortfolioContext = createContext()

export const PortfolioProvider = ({children}) => {
    const [portfolios, setPortfolios] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const { auth, loading: authLoading } = useAuth()

    const fetchPortfolios = async () => {
        try {
            setLoading(true)
            setErrors(null)
            
            const data = await getAllPortfolio()
            setPortfolios(data)
        } catch (error) {
            setErrors(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(authLoading) return
        
        if(!auth){
            setPortfolios([])
            return
        }

        fetchPortfolios()
    }, [auth, authLoading])

    const addPortfolio = async (dataPortfolio) => {
        try {
            setErrors(null)
            setLoading(true)

            const data = await createPortfolio(dataPortfolio)
            setPortfolios(prevPortfolios => [...prevPortfolios, data])
        } catch (error) {
            setErrors(error)
        } finally {
            setLoading(false)
        }
    }

    const portfolioById = async (id) => {
        try {
            const note = await getPortfolioById(id)

            return note
        } catch (error) {
            setErrors(error)
        }
    }

    const updatePortfolioById = async (id, dataPortfolio) => {
        try {
            setErrors(true)
            setLoading(true)

            const response = await updatePortfolio(id, dataPortfolio)

            setPortfolios(prevPortfolios =>
                prevPortfolios.map(port =>
                    Number(port.portfolios_id) === Number(id)
                        ? { ...port, ...dataPortfolio }
                        : port
                )
            );

            return response
        } catch (error) {
            setErrors(errors)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const dropPortfolio = async (id) => {
        try {
            setErrors(false)
            setLoading(true)
            const response = await deletePortfolio(id)
            setPortfolios(prevPortfolios => prevPortfolios.filter((iPor) => iPor.portfolios_id !== id))

            return response
        } catch (error) {
            setErrors("Ocurrio un error al eliminar")
        } finally {
            setLoading(false)
        }
    } 

    return (
        <PortfolioContext.Provider
            value={{
                portfolios,
                addPortfolio,
                portfolioById,
                isEditing,
                setIsEditing,
                dropPortfolio,
                updatePortfolioById,
                loading
            }}
        >
            {children}
        </PortfolioContext.Provider>
    )
}

export const usePortfolios = () => {
    const context = useContext(PortfolioContext)

    return context
}