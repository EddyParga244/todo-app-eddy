import type { Todo } from "../../types/todo";
import { Checkbox } from "../ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";

interface Props {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const TodoItem = ({ todo, toggleTodo, deleteTodo }: Props) => {
  const handleCheckbox = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const { attributes, listeners, setNodeRef } = useSortable({ id: todo.id });

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        className="group flex w-full flex-row items-center justify-between gap-3 border-b border-b-purple-300 px-6 py-4 dark:border-b-purple-800"
      >
        <div className="flex items-center gap-5">
          <Checkbox
            checked={todo.completed}
            className="h-8 w-8 cursor-pointer rounded-full border-2 bg-transparent! data-[state=checked]:border-none data-[state=checked]:bg-check data-[state=unchecked]:border-purple-300 data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:border-transparent data-[state=unchecked]:hover:[background:linear-gradient(var(--color-gray-50),var(--color-gray-50))_padding-box,var(--background-image-check)_border-box] dark:data-[state=unchecked]:border-purple-800 dark:data-[state=unchecked]:hover:[background:linear-gradient(var(--color-navy-900),var(--color-navy-900))_padding-box,var(--background-image-check)_border-box]"
            onCheckedChange={handleCheckbox}
          />
          <p
            {...listeners}
            className={`${todo.completed ? "text-purple-300 line-through dark:text-purple-700" : "text-navy-850 dark:text-purple-100"} cursor-grab`}
          >
            {todo.text}
          </p>
        </div>
        <img
          className="visible cursor-pointer md:invisible md:group-hover:visible"
          onClick={handleDelete}
          src="/src/assets/images/icon-cross.svg"
          alt=""
        />
      </div>
    </>
  );
};
