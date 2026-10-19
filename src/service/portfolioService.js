import apiInstance from "../api/api";

export const getAllPortfolio = async () => {
    const { data } = await apiInstance.get("/portfolio")

    return data
}

export const getPortfolioById = async (portfolio_id) => {
    const { data } = await apiInstance.get(`/portfolio/${portfolio_id}`)

    return data
}

export const createPortfolio = async (noteData) => {
    const { data } = await apiInstance.post(`/portfolio`, noteData)

    return data
}

export const updatePortfolio = async (id, noteData) => {
    const { data } = await apiInstance.put(`/portfolio/${id}`, noteData)

    return data
}

export const deletePortfolio = async (id) => {
    const { data } = await apiInstance.delete(`/portfolio/${id}`)

    return data
}