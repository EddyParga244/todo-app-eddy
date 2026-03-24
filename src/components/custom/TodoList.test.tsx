import { TodoContextProvider } from "@/context/TodoContext";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TodoList } from "./TodoList";
import { TodoInput } from "./TodoInput";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {
  test("should not display when list is empty", () => {
    render(
      <TodoContextProvider>
        <TodoList></TodoList>
      </TodoContextProvider>,
    );
    const list = screen.queryByRole("list");
    expect(list).toBeEmptyDOMElement();
  });

  test("should display list with items", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
      </TodoContextProvider>,
    );
    const list = screen.queryByRole("list");
    const input = screen.getByRole("textbox");
    const user = userEvent.setup();

    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some butter {Enter}");

    expect(list?.childElementCount).toBe(2);
  });
});
