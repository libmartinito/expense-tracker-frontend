export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("expense-tracker-auth-token", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("expense-tracker-auth-token");
  }

  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("expense-tracker-auth-token");
  }
};

export const setUserId = (id: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("expense-tracker-user-id", id);
  }
};

export const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("expense-tracker-user-id");
  }

  return null;
};

export const removeUserId = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("expense-tracker-user-id");
  }
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("expense-tracker-auth-token");
  }

  return false;
};
