import apiInstance from "./api";

export const registerRequest = async (dataUser) => {
    const {data} = await apiInstance.post("/auth/user", dataUser)
    
    return data
}

export const loginRequest = async (credentials) => {
    const { data } = await apiInstance.post("/auth/login", credentials)

    return data
}

export const profileRequest = async () => {
    const { data } = await apiInstance.get("/auth/profile")

    return data
}

export const updateProfileRequest = async (dataUser) => {
    const { data } = await apiInstance.post("/auth/profile", dataUser)

    return data
}

export const recoveryPasswordRequest = async (dataEmail) => {
    const { data } = await apiInstance.post("/auth/recover-password", dataEmail)

    return data
}