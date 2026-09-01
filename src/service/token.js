const TOKEN_KEY = "token"

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getItem = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}