import { TodoContextProvider } from "@/context/TodoContext";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { TodoItem } from "./TodoItem";
import userEvent from "@testing-library/user-event";

describe("TodoItem", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should show delete button when focused by using keyboard", async () => {
    const mockItem = { id: "1", text: "Pick up some milk", completed: false };

    render(
      <TodoContextProvider>
        <TodoItem todo={mockItem}></TodoItem>
      </TodoContextProvider>,
    );
    const user = userEvent.setup();

    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    const button = screen.getByTestId("deleteCross");

    expect(button).toBeInTheDocument();
  });
});
