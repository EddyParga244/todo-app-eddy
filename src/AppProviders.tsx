import { ThemeContextProvider } from "./context/ThemeContext";
import { TodoContextProvider } from "./context/TodoContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeContextProvider>
    <TodoContextProvider>{children}</TodoContextProvider>
  </ThemeContextProvider>
);
