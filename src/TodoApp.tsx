import { ToggleTheme } from "./ToggleTheme";

export function TodoApp() {
  return (
    <>
      <main className=" container flex min-h-screen min-w-screen flex-col text-center">
        <h1 className="flex flex-col font-josefin text-6xl font-bold text-blue-500">
          Todo
        </h1>
        <ToggleTheme></ToggleTheme>

        

        <div className="bg-check">
          <p className="text-green-200 dark:text-navy-950">
            Create a new todo...
          </p>
          <p>{/*Add number */} items left</p>
          <p>All Active</p>
          <p>Completed</p>
          <p>Clear</p>
          <p>Completed</p>
        </div>
        <p>Drag and drop to reorder list</p>
      </main>
    </>
  );
}
