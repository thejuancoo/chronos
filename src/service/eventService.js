import apiInstance from "../api/api";

export const getAllEvents = async () => {
    const response = await apiInstance("/events")

    return response.data
}

export const getEventById = async (id) => {
    const response = await apiInstance(`/events/${id}`)

    return response.data
}

export const createEvent = async (eventData) => {
    const response = await apiInstance.post(`/events`, eventData)

    return response.data
}