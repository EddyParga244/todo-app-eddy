import { TodoContextProvider } from "@/context/TodoContext";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { TodoFilter } from "./TodoFilter";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import userEvent from "@testing-library/user-event";

describe("TodoFilter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render the filters", () => {
    render(
      <TodoContextProvider>
        <TodoFilter></TodoFilter>
      </TodoContextProvider>,
    );
    const filter = screen.getByRole("tablist");
    const filterList = screen.getAllByRole("tab");

    expect(filter).toBeInTheDocument();
    expect(filterList).toHaveLength(3);
  });

  test(`should the "Active" filter work correctly`, async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFilter></TodoFilter>
      </TodoContextProvider>,
    );
    const user = userEvent.setup();
    const filterList = screen.getAllByRole("tab");
    const input = screen.getByRole("textbox");

    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some butter {Enter}");
    await user.type(input, "Pick up some eggs {Enter}");
    await user.type(input, "Pick up some vegetables {Enter}");
    const checkbox = screen.getAllByRole("checkbox");

    await userEvent.click(checkbox[1]);
    await userEvent.click(checkbox[2]);

    await userEvent.click(filterList[1]);

    expect(checkbox[0]).toBeInTheDocument();
    expect(checkbox[1]).not.toBeInTheDocument();
    expect(checkbox[2]).not.toBeInTheDocument();
    expect(checkbox[3]).toBeInTheDocument();
  });

  test(`should the "Completed" filter work correctly`, async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFilter></TodoFilter>
      </TodoContextProvider>,
    );
    const user = userEvent.setup();
    const filterList = screen.getAllByRole("tab");
    const input = screen.getByRole("textbox");

    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some butter {Enter}");
    await user.type(input, "Pick up some eggs {Enter}");
    await user.type(input, "Pick up some vegetables {Enter}");
    const checkbox = screen.getAllByRole("checkbox");

    await userEvent.click(checkbox[1]);
    await userEvent.click(checkbox[2]);

    await userEvent.click(filterList[2]);

    expect(checkbox[0]).not.toBeInTheDocument();
    expect(checkbox[1]).toBeInTheDocument();
    expect(checkbox[2]).toBeInTheDocument();
    expect(checkbox[3]).not.toBeInTheDocument();
  });

  test(`should the "All" filter work correctly`, async () => {
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFilter></TodoFilter>
      </TodoContextProvider>,
    );
    const user = userEvent.setup();
    const filterList = screen.getAllByRole("tab");
    const input = screen.getByRole("textbox");

    await user.type(input, "Pick up some milk {Enter}");
    await user.type(input, "Pick up some butter {Enter}");
    await user.type(input, "Pick up some eggs {Enter}");
    await user.type(input, "Pick up some vegetables {Enter}");
    const checkbox = screen.getAllByRole("checkbox");

    await userEvent.click(checkbox[2]);
    await userEvent.click(checkbox[3]);

    await userEvent.click(filterList[0]);

    expect(checkbox[0]).toBeInTheDocument();
    expect(checkbox[1]).toBeInTheDocument();
    expect(checkbox[2]).toBeInTheDocument();
    expect(checkbox[3]).toBeInTheDocument();
  });
});
