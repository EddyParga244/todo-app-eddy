import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodo } from "../../hooks/useTodo";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { filter, todo, reorderTodo, startDragging, endDragging } = useTodo();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const filteredTodos = todo.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "active") return !item.completed;
    return true;
  });

  const handleDragStart = () => {
    startDragging();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      reorderTodo(active.id as string, over?.id as string);
    }
    endDragging();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      accessibility={{
        announcements: {
          onDragStart: ({ active }) => {
            const text = todo.find((t) => t.id === active.id)?.text;
            return `Picking up task: ${text}`;
          },
          onDragOver: ({ over }) => {
            const text = todo.find((t) => t.id === over?.id)?.text;
            return `Drag over task: ${text}`;
          },
          onDragEnd: ({ active, over }) => {
            todo.find((t) => t.id === active.id)?.text;
            return over ? "Drag complete" : "Drag canceled";
          },
          onDragCancel({ active }) {
            todo.find((t) => t.id === active.id)?.text;
            return "Drag canceled";
          },
        },
      }}
    >
      <SortableContext
        items={filteredTodos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul>
          {filteredTodos.map((item) => (
            <li key={item.id}>
              <TodoItem todo={item}></TodoItem>
            </li>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
