import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";

export const ToggleTheme = () => {
  const { toggle, handleToggle } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-transparent dark:hover:bg-transparent"
      onClick={handleToggle}
    >
      {toggle ? (
        <img
          className="h-5 w-5"
          src="/todo-app-eddy/assets/images/icon-moon.svg"
          alt="Dark mode"
        />
      ) : (
        <img
          className="h-5 w-5"
          src="/todo-app-eddy/assets/images/icon-sun.svg"
          alt="Light mode"
        />
      )}
    </Button>
  );
};
