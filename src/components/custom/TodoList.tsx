import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodo } from "../../hooks/useTodo";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { filter, todo, toggleTodo, deleteTodo, reorderTodo } = useTodo();

  const filteredTodos = todo.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "active") return !item.completed;
    return true;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      reorderTodo(active.id as string, over?.id as string);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={filteredTodos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul>
          {filteredTodos.map((item) => (
            <li key={item.id}>
              <TodoItem
                todo={item}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              ></TodoItem>
            </li>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
