import apiInstance from "../api/api";

export const getAllEvents = async () => {
    const response = await apiInstance("/events")

    return response.data
}