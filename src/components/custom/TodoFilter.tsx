import { useTodo } from "../../hooks/useTodo";
import type { FilterType } from "../../types/todo";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export const TodoFilter = () => {
  const { filterTodo } = useTodo();
  const triggerClass =
    "cursor-pointer flex-none px-3 text-sm font-bold data-[state=active]:text-blue-500 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-navy-850 dark:data-[state=inactive]:text-purple-600 dark:data-[state=inactive]:hover:text-purple-300";

  return (
    <Tabs
      defaultValue="all"
      onValueChange={(value) => filterTodo(value as FilterType)}
      className="w-full"
    >
      <TabsList
        variant="line"
        className="w-full items-center justify-center gap-0 bg-transparent p-0 [&>button]:after:hidden"
      >
        <TabsTrigger value="all" className={triggerClass}>
          All
        </TabsTrigger>
        <TabsTrigger value="active" className={triggerClass}>
          Active
        </TabsTrigger>
        <TabsTrigger value="completed" className={triggerClass}>
          Completed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
