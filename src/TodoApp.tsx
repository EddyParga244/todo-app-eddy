import { ToggleTheme } from "./components/custom/ToggleTheme";
import { TodoInput } from "./components/custom/TodoInput";
import { TodoList } from "./components/custom/TodoList";
import { TodoFooter } from "./components/custom/TodoFooter";
import { TodoFilter } from "./components/custom/TodoFilter";

export function TodoApp() {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-start">
        <div className="container mt-18 max-w-xl px-4">
          <header className="mb-12 flex w-full flex-row items-center justify-between">
            <h1 className="flex flex-col text-4xl font-bold tracking-[.5em] text-white">
              TODO
            </h1>
            <ToggleTheme></ToggleTheme>
          </header>

          <div className="rounded-[5px] bg-gray-50 text-sm shadow-[0_35px_40px_-5px_rgba(0,0,0,0.4)] dark:bg-navy-900">
            <TodoInput></TodoInput>
          </div>

          <div className="mt-6 rounded-[5px] bg-gray-50 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] dark:bg-navy-900">
            <TodoList></TodoList>
            <TodoFooter></TodoFooter>
          </div>

          <div className="mt-4 flex items-center justify-center rounded-[5px] bg-gray-50 px-6 py-4 text-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] xs:hidden dark:bg-navy-900">
            <TodoFilter></TodoFilter>
          </div>

          <p className="mt-10 text-center text-sm text-gray-600 dark:text-purple-600">
            Drag and drop to reorder list
          </p>
        </div>
      </main>
    </>
  );
}
