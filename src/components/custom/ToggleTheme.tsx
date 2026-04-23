import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";

export const ToggleTheme = () => {
  const { toggle, handleToggle } = useTheme();

  return (
    <Button
      aria-label={toggle ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={toggle}
      variant="ghost"
      size="icon"
      className="hover:bg-transparent dark:hover:bg-transparent"
      onClick={handleToggle}
    >
      {toggle ? (
        <img
          className="h-5 w-5"
          src="/assets/images/icon-moon.svg"
          alt=""
        />
      ) : (
        <img
          className="h-5 w-5"
          src="/assets/images/icon-sun.svg"
          alt=""
        />
      )}
    </Button>
  );
};
