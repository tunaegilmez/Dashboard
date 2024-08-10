import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = async (email, password) => {
    const user = await AuthService.login(email, password);
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
