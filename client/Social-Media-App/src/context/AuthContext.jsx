import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    const savedUserData = localStorage.getItem("userData");
    try {
      return savedUserData ? JSON.parse(savedUserData) : null;
    } catch (e) {
      console.error("Failed to parse user data from localStorage:", e);
      return null;
    }
  };

  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    user: getInitialUser(),
  });

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem("token", authState.token);
      localStorage.setItem("userData", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    }
  }, [authState]);

  const login = (token, user) => {
    setAuthState({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setAuthState({ token: null, user: null });
  };

  const contextValue = { authState, setAuthState, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
