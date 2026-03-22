import { createContext, useEffect, useState } from "react";

type ThemeContextType = {
  toggle: boolean;
  handleToggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toggle, setToggle] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", toggle);
    localStorage.setItem("theme", toggle ? "dark" : "light");
  }, [toggle]);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ toggle, handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
