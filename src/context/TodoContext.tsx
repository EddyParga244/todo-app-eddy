import { createContext, useEffect, useState } from "react";
import type { FilterType, Todo } from "../types/todo";
import { arrayMove } from "@dnd-kit/sortable";
import { todoApi } from "@/api/todoApi";

type TodoContextType = {
  todo: Todo[];
  filter: FilterType;
  isDragging: boolean;
  announcement: string;
  fetchTodo: () => void;
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
  const [todo, setTodo] = useState<Todo[]>([]);

  const [filter, setFilter] = useState<FilterType>("all");

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const response = await todoApi.get("/api/todos");
    setTodo(response.data);
  };

  const addTodo = async (text: string) => {
    const completed = false;
    await todoApi.post("/api/todos", { completed, text });
    fetchTodo();
    setAnnouncement(`Task added: ${text}`);
  };

  const toggleTodo = async (id: string) => {
    const todoToUpdate = todo.find((todo) => todo.id === id);
    await todoApi.patch(`/api/todos/${id}`, {
      completed: !todoToUpdate?.completed,
    });
    fetchTodo();
  };

  const deleteTodo = async (id: string) => {
    const todoToDelete = todo.find((todo) => todo.id === id);
    await todoApi.delete(`/api/todos/${id}`);
    setAnnouncement(`Task deleted: ${todoToDelete?.text}`);
    fetchTodo();
  };

  const filterTodo = (filter: FilterType) => {
    setFilter(filter);
  };

  const reorderTodo = async (activeId: string, overId: string) => {
    const activeIndex = todo.findIndex((todo) => todo.id === activeId);
    const overIndex = todo.findIndex((todo) => todo.id === overId);
    const ids = arrayMove(todo, activeIndex, overIndex).map((todo) => todo.id);
    await todoApi.put("/api/todos/reorder", { data: ids });
    fetchTodo();
  };

  const clearCompleted = async () => {
    const completedTodos = todo.filter((todo) => todo.completed);
    await Promise.all(completedTodos.map((todo) => deleteTodo(todo.id)));
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
        fetchTodo,
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
