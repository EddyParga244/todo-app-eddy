import { createContext, useEffect, useState } from "react";
import type { FilterType, Todo } from "../types/todo";
import { arrayMove } from "@dnd-kit/sortable";

type TodoContextType = {
  todo: Todo[];
  filter: FilterType;
  isDragging: boolean;
  announcement: string;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  filterTodo: (filter: FilterType) => void;
  reorderTodo: (activeId: string, overId: string) => void;
  clearCompleted: () => void;
  startDragging: () => void;
  endDragging: () => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todo, setTodo] = useState<Todo[]>(() => {
    const storedTodo = localStorage.getItem("todo");
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  const [filter, setFilter] = useState<FilterType>("all");

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const addTodo = (text: string) => {
    const id = crypto.randomUUID();
    const completed = false;
    const createTodo = { id, completed, text };
    setTodo((prev) => [...prev, createTodo]);
    setAnnouncement(`Task added: ${text}`);
  };

  const toggleTodo = (id: string) => {
    setTodo((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return { ...todo };
        }
      }),
    );
  };

  const deleteTodo = (id: string) => {
    const todoToDelete = todo.find((todo) => todo.id === id);
    setTodo((prev) => prev.filter((todo) => todo.id !== id));
    setAnnouncement(`Task deleted: ${todoToDelete?.text}`);
  };

  const filterTodo = (filter: FilterType) => {
    setFilter(filter);
  };

  const reorderTodo = (activeId: string, overId: string) => {
    setTodo((prev) => {
      const activeIndex = prev.findIndex((todo) => todo.id === activeId);
      const overIndex = prev.findIndex((todo) => todo.id === overId);
      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  const clearCompleted = () => {
    setTodo((prev) => prev.filter((todo) => !todo.completed));
  };

  const startDragging = () => {
    setIsDragging(true);
  };

  const endDragging = () => {
    setIsDragging(false);
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        filter,
        isDragging,
        announcement,
        addTodo,
        toggleTodo,
        deleteTodo,
        filterTodo,
        reorderTodo,
        clearCompleted,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
