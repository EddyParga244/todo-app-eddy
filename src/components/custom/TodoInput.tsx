import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import { Input } from "../ui/input";

export const TodoInput = () => {
  const { addTodo } = useTodo();
  const [input, setInput] = useState("");

  const handleInput = () => {
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo(input);
      handleInput();
    }
  };

  return (
    <>
      <div className="flex w-full flex-row items-center gap-5 px-6 py-4">
        <div className="h-8 w-8 shrink-0 rounded-full border-2 border-purple-300 dark:border-purple-800"></div>
        <Input
          className="border-none bg-transparent text-sm text-purple-800 caret-blue-500 focus-visible:border-none focus-visible:ring-0 dark:border-none dark:bg-transparent dark:text-gray-600"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          type="text"
          placeholder="Create a new todo..."
          onKeyDown={handleKeyDown}
        ></Input>
      </div>
    </>
  );
};
