import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { TodoApp } from "@/TodoApp";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";

export const TodoRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Cargando...</h1>
  }

  return (
    <BrowserRouter basename="/todo-app-eddy">
      <Routes>
        <Route path="/login"  element={<LoginPage></LoginPage>}></Route>
        <Route path="/register"  element={<RegisterPage></RegisterPage>}></Route>

        <Route path="/" element={isAuthenticated ? <TodoApp /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
