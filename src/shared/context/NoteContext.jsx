import { createContext, useContext, useState, useEffect, Children } from "react";

import { getAllNotes } from "../../service/noteService";
import useAuth from "../hooks/useAuth";

const NoteContext = createContext()

export const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(null)

    const { auth, loading: authLoading } = useAuth()

    const fetchNotes = async () => {
        try {
            setLoading(true)
            setErrors(null)
            
            const data = await getAllNotes()
            setNotes(data)
        } catch (error) {
            setErrors(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(authLoading) return
        
        if(!auth){
            setNotes([])
            return
        }

        fetchNotes()
    }, [auth, authLoading])

    return (
        <NoteContext.Provider
            value={{
                notes
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = () => {
    const context = useContext(NoteContext)

    return context
}