const isBrowser = typeof window !== "undefined";

export const setToken = (token: string) => {
  if (isBrowser) {
    localStorage.setItem("expense-tracker-auth-token", token);
  }
};

export const getToken = () => {
  if (isBrowser) {
    return localStorage.getItem("expense-tracker-auth-token");
  }
};

export const removeToken = () => {
  if (isBrowser) {
    localStorage.removeItem("expense-tracker-auth-token");
  }
};

export const setUserId = (id: string) => {
  if (isBrowser) {
    localStorage.setItem("expense-tracker-user-id", id);
  }
};

export const getUserId = () => {
  if (isBrowser) {
    return localStorage.getItem("expense-tracker-user-id");
  }
};

export const removeId = () => {
  if (isBrowser) {
    localStorage.removeItem("expense-tracker-user-id");
  }
};

export const isAuthenticated = () => {
  if (isBrowser) {
    return !!localStorage.getItem("expense-tracker-auth-token");
  }
};
