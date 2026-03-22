import { TodoClear } from "./TodoClear";
import { TodoCount } from "./TodoCount";
import { TodoFilter } from "./TodoFilter";

export const TodoFooter = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <TodoCount></TodoCount>
      <div className="hidden xs:block">
        <TodoFilter></TodoFilter>
      </div>
      <TodoClear></TodoClear>
    </div>
  );
};
