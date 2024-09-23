export const setToken = (token: string) => {
  localStorage.setItem("expense-tracker-auth-token", token)
}

export const getToken = () => {
  return localStorage.getItem("expense-tracker-auth-token")
}

export const removeToken = () => {
  localStorage.removeItem("expense-tracker-auth-token")
}
