import React, { createContext, useContext, useState } from "react";

// AuthContext implementation
export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially, no user is logged in

  const login = (userInfo) => {
    setUser(userInfo); // Set user state on login
  };

  const logout = () => {
    setUser(null); 
    // You can also add other logic to clear sessionStorage, cookies, etc.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
