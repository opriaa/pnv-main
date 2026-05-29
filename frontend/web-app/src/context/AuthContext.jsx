import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (tokenVal, userVal) => {
    localStorage.setItem("token", tokenVal);
    localStorage.setItem("user", JSON.stringify(userVal));
    setToken(tokenVal);
    setUser(userVal);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const updateUser = (userVal) => {
    localStorage.setItem("user", JSON.stringify(userVal));
    setUser(userVal);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
