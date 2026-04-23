import { useEffect, useRef, useState } from "react";
import type { Todo } from "../../types/todo";
import { Checkbox } from "../ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { useTodo } from "@/hooks/useTodo";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { isDragging, toggleTodo, deleteTodo } = useTodo();

  const relatedTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragging && !isDraggingItem) {
      setIsFocused(false);
    }
  }, [isDragging]);

  const handleCheckbox = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleRefs = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    relatedTarget.current = node;
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging: isDraggingItem,
    isOver,
  } = useSortable({ id: todo.id });

  return (
    <>
      <div
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!relatedTarget.current?.contains(e.relatedTarget)) {
            setIsFocused(false);
          }
        }}
        ref={handleRefs}
        className={`${isDraggingItem ? "bg-purple-300 dark:bg-purple-800" : ""} ${isOver ? "bg-blue-400/50" : ""} group flex w-full flex-row items-center justify-between gap-3 border-b border-b-purple-300 px-6 py-4 dark:border-b-purple-800`}
      >
        <div className="flex items-center gap-5">
          <Checkbox
            aria-label={
              todo.completed ? `Uncheck ${todo.text}` : `Check ${todo.text}`
            }
            checked={todo.completed}
            className="h-8 w-8 cursor-pointer rounded-full border-2 bg-transparent! data-[state=checked]:border-none data-[state=checked]:bg-check data-[state=unchecked]:border-purple-300 data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:border-transparent data-[state=unchecked]:hover:[background:linear-gradient(var(--color-gray-50),var(--color-gray-50))_padding-box,var(--background-image-check)_border-box] dark:data-[state=unchecked]:border-purple-800 dark:data-[state=unchecked]:hover:[background:linear-gradient(var(--color-navy-900),var(--color-navy-900))_padding-box,var(--background-image-check)_border-box]"
            onCheckedChange={handleCheckbox}
          />
          <p
            {...listeners}
            {...attributes}
            className={`${todo.completed ? "text-purple-300 line-through dark:text-purple-700" : "text-navy-850 dark:text-purple-100"} cursor-grab`}
          >
            {todo.text}
          </p>
        </div>
        <button
          className={`visible cursor-pointer md:invisible md:group-hover:visible ${isFocused ? "md:visible" : ""}`}
          onClick={handleDelete}
          aria-label={`Delete ${todo.text}`}
          data-testid="deleteCross"
        >
          <img src="/assets/images/icon-cross.svg" alt="" />
        </button>
      </div>
    </>
  );
};
