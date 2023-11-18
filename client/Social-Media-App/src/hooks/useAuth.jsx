import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkUserSession();
  }, []);

  const login = async (email, password, username) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
        username,
      });
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const checkUserSession = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/session");
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Session check error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
