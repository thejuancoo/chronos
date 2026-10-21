import apiInstance from "../api/api";

export const getAllPortfolio = async () => {
    const { data } = await apiInstance.get("/portfolios")

    return data
}

export const getPortfolioById = async (portfolio_id) => {
    const { data } = await apiInstance.get(`/portfolios/${portfolio_id}`)

    return data
}

export const getPortfolioAndNotesRequest = async (portfolio_id) => {
    const { data } = await apiInstance.get(`/portfolios/${portfolio_id}/notes`)

    return data
}

export const createPortfolioRequest = async (portfolioData) => {
    const { data } = await apiInstance.post(`/portfolios`, portfolioData)

    return data
}

export const updatePortfolio = async (id, portfolioData) => {
    const { data } = await apiInstance.put(`/portfolios/${id}`, portfolioData)

    return data
}

export const deletePortfolio = async (id) => {
    const { data } = await apiInstance.delete(`/portfolios/${id}`)

    return data
}