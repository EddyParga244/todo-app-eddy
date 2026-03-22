import { useTodo } from "../../hooks/useTodo";
import { Button } from "../ui/button";

export const TodoClear = () => {
  const { clearCompleted } = useTodo();
  return (
    <Button
      variant="ghost"
      className="cursor-pointer p-0 text-sm text-gray-600 hover:bg-transparent! hover:text-navy-850 dark:text-purple-600 dark:hover:text-purple-300"
      type="button"
      onClick={clearCompleted}
    >
      Clear Completed
    </Button>
  );
};
