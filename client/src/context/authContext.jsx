import { createContext, useState, useContext, useEffect } from 'react';
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from '../api/auth';
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  // ************************ functions to make request/response communication with backend ************************
  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (!error.response.data) {
        return setErrors(['No Server Response']);
      } else if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };
  const logIn = async (account) => {
    try {
      const res = await loginRequest(account);
      console.log(res);
      const accessToken = res.data.accessToken;
      if (accessToken) {
        const cookies = Cookie.get();
        console.log(cookies);
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      if (!error.response.data) {
        return setErrors(['No Server Response']);
      } else if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };
  const logOut = () => {
    Cookie.remove("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  };
  // ************************ functions running at starting of any page ************************
  // Refresh token validation to stay on session
  useEffect(() => {
    const getCookie = async () => {
      const cookies = Cookie.get();
      //console.log(cookies);

      if (!cookies.refreshToken) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    getCookie();
  }, []);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
