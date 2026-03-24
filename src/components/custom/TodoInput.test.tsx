import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { TodoInput } from "./TodoInput";
import { TodoContextProvider } from "@/context/TodoContext";

describe("TodoInput", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render input correctly", () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
      </TodoContextProvider>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
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
    expect(input).toHaveValue("");
  });
});
