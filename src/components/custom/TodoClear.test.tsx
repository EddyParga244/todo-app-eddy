import { TodoContextProvider } from "@/context/TodoContext";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { TodoClear } from "./TodoClear";
import { TodoInput } from "./TodoInput";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";

describe("TodoClear", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  test("should render the button", () => {
    render(
      <TodoContextProvider>
        <TodoClear></TodoClear>
      </TodoContextProvider>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("should delete completed todos when the button is pressed", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoClear></TodoClear>
      </TodoContextProvider>,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const clear = screen.getByRole("button");

    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some milk {Enter}");
    const checkbox = screen.getAllByRole("checkbox");

    await userEvent.click(checkbox[0]);
    await userEvent.click(checkbox[1]);
    await user.click(clear);

    expect(checkbox[0]).not.toBeInTheDocument();
    expect(checkbox[1]).not.toBeInTheDocument();
  });
});
