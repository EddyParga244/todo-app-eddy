import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { TodoInput } from "./TodoInput";
import { TodoContextProvider } from "@/context/TodoContext";

vi.mock("@/api/todoApi");

describe("TodoInput", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render input correctly", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
      </TodoContextProvider>,
    );
    const input = screen.getByRole("textbox");
    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });
  });

  test("should clear input after pressing Enter", async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
      </TodoContextProvider>,
    );
    const input = screen.getByRole("textbox");
    const user = userEvent.setup();

    await user.type(input, "Pick up some milk {Enter}");
    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });
});
