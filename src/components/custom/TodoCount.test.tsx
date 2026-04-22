import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { TodoCount } from "./TodoCount";
import { TodoContextProvider } from "@/context/TodoContext";
import { TodoInput } from "./TodoInput";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";
import { todoApi } from "@/api/todoApi";

vi.mock("@/api/todoApi");

describe("TodoCount", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should display 0 items left", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoCount></TodoCount>
      </TodoContextProvider>,
    );
    const counter = screen.getByText("0 items left");
    await waitFor(() => {
      expect(counter).toHaveTextContent("0 items left");
    });
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

    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [{ id: "0", text: "Pick up some milk", completed: false }],
    });
    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [
        { id: "0", text: "Pick up some milk", completed: false },
        { id: "1", text: "Pick up some milk", completed: false },
      ],
    });

    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some milk {Enter}");

    await waitFor(() => {
      expect(counter).toHaveTextContent("2 items left");
    });
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

    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [{ id: "0", text: "Pick up some milk", completed: false }],
    });
    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [
        { id: "0", text: "Pick up some milk", completed: false },
        { id: "1", text: "Pick up some milk", completed: false },
      ],
    });

    vi.mocked(todoApi.delete).mockResolvedValueOnce({
      data: [{ id: "0", text: "Pick up some milk", completed: false }],
    });

    await user.type(input, "Pick up some milk {Enter}");
    const button = screen.getByTestId("deleteCross");

    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [{ id: "1", text: "Pick up some milk", completed: false }],
    });

    await user.type(input, "Pick up some milk {Enter}");
    await user.click(button);

    await waitFor(() => {
      expect(counter).toHaveTextContent("1 items left");
    });
  });
});
