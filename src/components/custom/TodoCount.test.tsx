import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { TodoCount } from "./TodoCount";
import { TodoContextProvider } from "@/context/TodoContext";
import { TodoInput } from "./TodoInput";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";

describe("TodoCount", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should display 0 items left", () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoCount></TodoCount>
      </TodoContextProvider>,
    );
    const counter = screen.getByText("0 items left");
    expect(counter).toHaveTextContent("0 items left");
  });

  test("should increase number of items left when an item is added", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoCount></TodoCount>
      </TodoContextProvider>,
    );
    const input = screen.getByRole("textbox");
    const user = userEvent.setup();
    const counter = screen.getByText("0 items left");

    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some milk {Enter}");

    expect(counter).toHaveTextContent("2 items left");
  });

  test("should decrease number of items left when an item is deleted", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoCount></TodoCount>
      </TodoContextProvider>,
    );
    const input = screen.getByRole("textbox");
    const user = userEvent.setup();
    const counter = screen.getByText("0 items left");

    await user.type(input, "Pick up some milk {Enter}");
    const button = screen.getByTestId("deleteCross");

    await user.type(input, "Pick up some milk {Enter}");
    await user.click(button);

    expect(counter).toHaveTextContent("1 items left");
  });
});
