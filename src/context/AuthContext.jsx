import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const getUser = async () => {
    try {
      const { data } = await axios.get('/api/user');
      setUser(data);
      // Zapisz dane użytkownika do localStorage
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      setUser(null);
      // Wyczyść dane użytkownika z localStorage w przypadku błędu
      localStorage.removeItem('user');
    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post('/login', data);
      await getUser();
      navigate("/profile");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post('/register', data);
      await getUser();
      navigate("/profile");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const logout = () => {
    axios.post('/logout').then(() => {
      setUser(null);
      // Wyczyść dane użytkownika z localStorage przy wylogowaniu
      localStorage.removeItem('user');
      navigate("/");
    });
  };

  useEffect(() => {
    // Sprawdź, czy są zapisane dane użytkownika w localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, errors, getUser, login, register, logout, csrf }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
