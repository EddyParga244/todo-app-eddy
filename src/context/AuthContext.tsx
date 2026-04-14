import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { todoApi } from "@/api/todoApi";

type User = {
  email: string;
};

type AuthContextType = {
  token: string;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  Login: (email: string, password: string) => Promise<void>;
  Register: (email: string, password: string) => Promise<void>;
  Logout: () => void;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await todoApi.get("/api/todos");

        if (response.status === 200) {
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            const userDecoded = jwtDecode<{ email: string }>(storedToken);
            setIsAuthenticated(true);
            setIsLoading(false);
            setToken(storedToken);
            setUser(userDecoded);
          }
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const Login = async (email: string, password: string) => {
    const response = await todoApi.post("/api/auth/login", { email, password });
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setIsLoading(false);
    setUser({ email });
    setToken(token);
  };

  const Register = async (email: string, password: string) => {
    await todoApi.post("/api/auth/register", {
      email,
      password,
    });
  };

  const Logout = async () => {
    await todoApi.delete("/api/auth/logout");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setToken("");
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isLoading,
        Login,
        Register,
        Logout,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
