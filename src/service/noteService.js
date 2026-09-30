import apiInstance from "../api/api";

export const getAllNotes = async () => {
    const { data } = await apiInstance.get("/notes")

    return data
}