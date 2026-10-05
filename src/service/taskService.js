import apiInstance from "../api/api";

export const getAllTasks = async () => {
    const response = await apiInstance("/tasks")

    return response.data
}

export const getTaskById = async (id) => {
    const response = await apiInstance(`/tasks/${id}`)

    return response.data
}

export const createTask = async (taskData) => {
    const response = await apiInstance.post(`/tasks`, taskData)

    return response.data
}

export const updateTask = async (id, taskData) => {
    const response = await apiInstance.put(`/tasks/${id}`, taskData)

    return response.data
}

export const deleteTask = async (id) => {
    const response = await apiInstance.delete(`/tasks/${id}`)

    return response.data
}