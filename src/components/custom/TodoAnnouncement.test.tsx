import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoContextProvider } from "@/context/TodoContext";
import { TodoAnnouncement } from "./TodoAnnouncement";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

describe("TodoAnnouncement", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should not render on the page", () => {
    render(
      <TodoContextProvider>
        <TodoAnnouncement></TodoAnnouncement>
      </TodoContextProvider>,
    );
    const p = screen.getByTestId("announcement");
    expect(p).toHaveTextContent("");
  });

  test("should announce when a task is added", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoAnnouncement></TodoAnnouncement>
      </TodoContextProvider>,
    );
    const input = screen.getByRole("textbox");
    const user = userEvent.setup();

    await user.type(input, "Pick up some milk {Enter}");

    const p = screen.getByTestId("announcement");
    expect(p).toHaveTextContent("Task added: Pick up some milk");
  });

  test("should announce when a task is deleted", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoAnnouncement></TodoAnnouncement>
      </TodoContextProvider>,
    );
    const input = screen.getByRole("textbox");
    const user = userEvent.setup();
    await user.type(input, "Pick up some milk {Enter}");

    const button = screen.getByTestId("deleteCross");

    const p = screen.getByTestId("announcement");

    await user.click(button);
    expect(p).toHaveTextContent("Task deleted: Pick up some milk");
  });
});
