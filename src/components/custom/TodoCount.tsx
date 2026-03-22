import { useTodo } from "../../hooks/useTodo";

export const TodoCount = () => {
  const { todo } = useTodo();
  return (
    <span className="text-sm text-gray-600 dark:text-purple-600">
      {todo.filter((item) => !item.completed).length} items left
    </span>
  );
};
