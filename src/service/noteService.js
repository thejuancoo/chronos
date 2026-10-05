import apiInstance from "../api/api";

export const getAllNotes = async () => {
    const { data } = await apiInstance.get("/notes")

    return data
}

export const getNoteById = async (notes_id) => {
    const { data } = await apiInstance.get(`/notes/${notes_id}`)

    return data
}

export const createNote = async (noteData) => {
    const response = await apiInstance.post(`/notes`, noteData)

    return response.data
}

export const updateNote = async (id, noteData) => {
    const response = await apiInstance.put(`/notes/${id}`, noteData)

    return response.data
}

export const deleteNote = async (id) => {
    const response = await apiInstance.delete(`/notes/${id}`)

    return response.data
}