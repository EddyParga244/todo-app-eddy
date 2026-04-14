import { AuthContextProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { TodoContextProvider } from "./context/TodoContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeContextProvider>
    <AuthContextProvider>
      <TodoContextProvider>{children}</TodoContextProvider>
    </AuthContextProvider>
  </ThemeContextProvider>
);
