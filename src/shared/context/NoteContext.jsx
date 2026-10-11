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
            setErrors(null)
            setLoading(true)

            const data = await createNote(dataNote)
            setNotes(prevNotes => [...prevNotes, data])
        } catch (error) {
            setErrors(error)
        } finally {
            setLoading(false)
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

    const updateNoteById = async (id, noteData) => {
        try {
            setErrors(true)
            setLoading(true)

            const response = await updateNote(id, noteData)

            setNotes(prevNotes =>
                prevNotes.map(note =>
                    Number(note.notes_id) === Number(id)
                        ? { ...note, ...noteData }
                        : note
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

    const dropNote = async (id) => {
        try {
            setErrors(false)
            setLoading(true)
            const response = await deleteNote(id)
            setNotes(prevNotes => prevNotes.filter((iNote) => iNote.notes_id !== id))

            return response
        } catch (error) {
            setErrors("Ocurrio un error al eliminar")
        } finally {
            setLoading(false)
        }
    } 

    return (
        <NoteContext.Provider
            value={{
                notes,
                addNote,
                noteById,
                isEditing,
                setIsEditing,
                dropNote,
                updateNoteById,
                loading
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