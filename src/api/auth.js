import apiInstance from "./api";

export const loginRequest = async (credentials) => {
    const { data } = await apiInstance.post("/auth/login", credentials)

    return data
}

export const profileRequest = async () => {
    const { data } = await apiInstance.get("/auth/profile")

    return data
}