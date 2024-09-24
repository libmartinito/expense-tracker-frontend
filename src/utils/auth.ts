export const setToken = (token: string) => {
  localStorage.setItem("expense-tracker-auth-token", token);
};

export const getToken = () => {
  return localStorage.getItem("expense-tracker-auth-token");
};

export const removeToken = () => {
  localStorage.removeItem("expense-tracker-auth-token");
};

export const setUserId = (id: string) => {
  localStorage.setItem("expense-tracker-user-id", id)
}

export const getUserId = () => {
  return localStorage.getItem("expense-tracker-user-id")
}

export const removeId = () => {
  localStorage.removeItem("expense-tracker-user-id");
}

export const isAuthenticated = () => {
  console.log(">>> from utils get auth", !!localStorage.getItem("expense-tracker-auth-token"))
  return !!localStorage.getItem("expense-tracker-auth-token")
}
