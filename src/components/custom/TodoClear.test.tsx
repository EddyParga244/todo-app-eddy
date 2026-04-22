import { TodoContextProvider } from "@/context/TodoContext";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { TodoClear } from "./TodoClear";
import { TodoInput } from "./TodoInput";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";
import { todoApi } from "@/api/todoApi";

vi.mock("@/api/todoApi");

describe("TodoClear", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render the button", async () => {
    render(
      <TodoContextProvider>
        <TodoClear></TodoClear>
      </TodoContextProvider>,
    );
    const button = screen.getByRole("button");

    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });
  });

  test("should delete completed todos when the button is pressed", async () => {
    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [
        { id: "0", text: "Pick up some milk", completed: true },
        { id: "1", text: "Pick up some eggs", completed: true },
        { id: "2", text: "Pick up some bacon", completed: false },
        { id: "3", text: "Pick up some cheese", completed: false },
      ],
    });

    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoClear></TodoClear>
      </TodoContextProvider>,
    );
    const user = userEvent.setup();
    // const input = screen.getByRole("textbox");
    const clear = screen.getByRole("button");

    // await user.type(input, "Pick up some milk {Enter}");
    // await user.type(input, "Pick up some eggs {Enter}");
    // await user.type(input, "Pick up some bacon {Enter}");
    // await user.type(input, "Pick up some cheese {Enter}");

    await waitFor(() => {
      expect(screen.getByText("Pick up some milk")).toBeInTheDocument();
    });

    const milk = screen.getByText("Pick up some milk");
    const eggs = screen.getByText("Pick up some eggs");

    // await userEvent.click(checkbox[0]);
    // await userEvent.click(checkbox[1]);

    vi.mocked(todoApi.delete).mockResolvedValueOnce({
      data: [
        { id: "0", text: "Pick up some milk", completed: true },
        { id: "1", text: "Pick up some eggs", completed: true },
      ],
    });

    vi.mocked(todoApi.get).mockResolvedValue({
      data: [
        { id: "2", text: "Pick up some bacon", completed: false },
        { id: "3", text: "Pick up some cheese", completed: false },
      ],
    });

    await user.click(clear);

    await waitFor(() => {
      expect(milk).not.toBeInTheDocument();
      expect(eggs).not.toBeInTheDocument();
    });
  });
});
