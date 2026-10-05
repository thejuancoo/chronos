import { createContext, useContext, useState, useEffect } from "react";
import { 
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} from "../../service/noteService";
import useAuth from "../hooks/useAuth";

const NoteContext = createContext()

export const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

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

    const addNote = async (dataNote) => {
        try {
            await createNote(dataNote)
        } catch (error) {
            setErrors(error)
        }
    }

    const noteById = async (id) => {
        try {
            const note = await getNoteById(id)

            return note
        } catch (error) {
            setErrors(error)
        }
    }

    return (
        <NoteContext.Provider
            value={{
                notes,
                addNote,
                noteById,
                isEditing
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