import { useState } from "react";

export const ToggleTheme = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    document.documentElement.classList.toggle("dark");
    setToggle(!toggle);
  };

  return (
    <button
      className="flex cursor-pointer rounded-md border-2 bg-gray-50 text-green-200 dark:bg-blue-500 dark:text-navy-950"
      onClick={handleToggle}
    >
      {toggle ? (
        <img className="text-navy-850" src="/src/assets/images/icon-moon.svg" alt="" />
      ) : (
        <img className="text-gray-50" src="/src/assets/images/icon-sun.svg" alt="" />
      )}
    </button>
  );
};
