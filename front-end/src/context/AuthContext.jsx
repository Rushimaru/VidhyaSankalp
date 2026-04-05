import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Role → default redirect path
export const roleHomeMap = {
  superadmin: '/super-admin',
  admin:      '/',
  faculty:    '/faculty',
  student:    '/student',
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (newToken, newUser) => {
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    document.cookie = `userId=${newUser._id}; path=/; SameSite=Strict`;
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    document.cookie = "userId=; path=/; SameSite=Strict; max-age=0";
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;
  const userHome = user ? (roleHomeMap[user.role] || '/') : '/auth/login';

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, userHome }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};