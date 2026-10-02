import apiInstance from "../api/api";

export const getAllNotes = async () => {
    const { data } = await apiInstance.get("/notes")

    return data
}

export const getNoteById = async (notes_id) => {
    const { data } = await apiInstance.get(`/notes/${notes_id}`)

    return data
}