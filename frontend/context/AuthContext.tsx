"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API = "http://localhost:8080/kdevbill/auth";

interface AuthContextType {
  user: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface DecodedToken {
  sub: string; // username
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // ✅ Re-cargar usuario si ya estaba logueado (por refresco de página)
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded.sub);
        setRole(decoded.role);
      } catch {
        // token inválido → limpiar
        Cookies.remove("token");
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { data } = await axios.post(`${API}/login`, { username, password });

    Cookies.set("token", data.access_token, { expires: 1 });

    const decoded = jwtDecode<DecodedToken>(data.access_token);
    setUser(decoded.sub);
    setRole(decoded.role);
  };

  const register = async (email: string, username: string, password: string) => {
    const { data } = await axios.post(`${API}/register`, { email, username, password });

    Cookies.set("token", data.access_token, { expires: 1 });

    const decoded = jwtDecode<DecodedToken>(data.access_token);
    setUser(decoded.sub);
    setRole(decoded.role);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setRole(null);
    window.location.href = "/login"; // redirect ✅
  };

  return (
    <AuthContext.Provider value={{ user, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
