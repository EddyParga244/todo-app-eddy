import { TodoContextProvider } from "@/context/TodoContext";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TodoList } from "./TodoList";
import { TodoInput } from "./TodoInput";
import userEvent from "@testing-library/user-event";
import { todoApi } from "@/api/todoApi";

vi.mock("@/api/todoApi");

describe("TodoList", () => {
  test("should not display when list is empty", async () => {
    render(
      <TodoContextProvider>
        <TodoList></TodoList>
      </TodoContextProvider>,
    );
    const list = screen.queryByRole("list");
    await waitFor(() => {
      expect(list).toBeEmptyDOMElement();
    });
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

    vi.mocked(todoApi.get).mockResolvedValue({
      data: [
        { id: "0", text: "Pick up some milk", completed: false },
        { id: "1", text: "Pick up some butter", completed: false },
      ],
    });

    const user = userEvent.setup();

    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some butter {Enter}");
    await waitFor(() => {
      expect(list?.childElementCount).toBe(2);
    });
  });
});
