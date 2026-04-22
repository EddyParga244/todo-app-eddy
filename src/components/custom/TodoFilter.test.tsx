import { TodoContextProvider } from "@/context/TodoContext";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { TodoFilter } from "./TodoFilter";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import userEvent from "@testing-library/user-event";
import { todoApi } from "@/api/todoApi";

vi.mock("@/api/todoApi");

describe("TodoFilter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render the filters", async () => {
    render(
      <TodoContextProvider>
        <TodoFilter></TodoFilter>
      </TodoContextProvider>,
    );
    const filter = screen.getByRole("tablist");
    const filterList = screen.getAllByRole("tab");

    await waitFor(() => {
      expect(filter).toBeInTheDocument();
      expect(filterList).toHaveLength(3);
    });
  });

  test(`should the "Active" filter work correctly`, async () => {
    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [
        { id: "0", text: "Pick up some milk", completed: false },
        { id: "1", text: "Pick up some butter", completed: true },
        { id: "2", text: "Pick up some eggs", completed: true },
        { id: "3", text: "Pick up some vegetables", completed: false },
      ],
    });
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFilter></TodoFilter>
      </TodoContextProvider>,
    );
    // const user = userEvent.setup();
    const filterList = screen.getAllByRole("tab");
    // const input = screen.getByRole("textbox");

    // await user.type(input, "Pick up some milk {Enter}");
    // await user.type(input, "Pick up some butter {Enter}");
    // await user.type(input, "Pick up some eggs {Enter}");
    // await user.type(input, "Pick up some vegetables {Enter}");

    await waitFor(() => {
      expect(screen.getByText("Pick up some milk")).toBeInTheDocument();
    });

    const milk = screen.getByText("Pick up some milk");
    const butter = screen.getByText("Pick up some butter");
    const eggs = screen.getByText("Pick up some eggs");
    const vegetables = screen.getByText("Pick up some vegetables");

    // const checkbox = screen.getAllByRole("checkbox");

    // await userEvent.click(checkbox[1]);
    // await userEvent.click(checkbox[2]);

    await userEvent.click(filterList[1]);

    expect(milk).toBeInTheDocument();
    expect(butter).not.toBeInTheDocument();
    expect(eggs).not.toBeInTheDocument();
    expect(vegetables).toBeInTheDocument();
  });

  test(`should the "Completed" filter work correctly`, async () => {
    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [
        { id: "0", text: "Pick up some milk", completed: false },
        { id: "1", text: "Pick up some butter", completed: true },
        { id: "2", text: "Pick up some eggs", completed: true },
        { id: "3", text: "Pick up some vegetables", completed: false },
      ],
    });
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFilter></TodoFilter>
      </TodoContextProvider>,
    );
    // const user = userEvent.setup();
    const filterList = screen.getAllByRole("tab");
    // const input = screen.getByRole("textbox");

    // await user.type(input, "Pick up some milk {Enter}");
    // await user.type(input, "Pick up some butter {Enter}");
    // await user.type(input, "Pick up some eggs {Enter}");
    // await user.type(input, "Pick up some vegetables {Enter}");
    // const checkbox = screen.getAllByRole("checkbox");

    await waitFor(() => {
      expect(screen.getByText("Pick up some milk")).toBeInTheDocument();
    });

    const milk = screen.getByText("Pick up some milk");
    const butter = screen.getByText("Pick up some butter");
    const eggs = screen.getByText("Pick up some eggs");
    const vegetables = screen.getByText("Pick up some vegetables");

    // await userEvent.click(checkbox[1]);
    // await userEvent.click(checkbox[2]);

    await userEvent.click(filterList[2]);

    expect(milk).not.toBeInTheDocument();
    expect(butter).toBeInTheDocument();
    expect(eggs).toBeInTheDocument();
    expect(vegetables).not.toBeInTheDocument();
  });

  test(`should the "All" filter work correctly`, async () => {
    vi.mocked(todoApi.get).mockResolvedValueOnce({
      data: [
        { id: "0", text: "Pick up some milk", completed: false },
        { id: "1", text: "Pick up some butter", completed: true },
        { id: "2", text: "Pick up some eggs", completed: true },
        { id: "3", text: "Pick up some vegetables", completed: false },
      ],
    });
    render(
      <TodoContextProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFilter></TodoFilter>
      </TodoContextProvider>,
    );
    // const user = userEvent.setup();
    const filterList = screen.getAllByRole("tab");
    // const input = screen.getByRole("textbox");

    // await user.type(input, "Pick up some milk {Enter}");
    // await user.type(input, "Pick up some butter {Enter}");
    // await user.type(input, "Pick up some eggs {Enter}");
    // await user.type(input, "Pick up some vegetables {Enter}");
    // const checkbox = screen.getAllByRole("checkbox");

    await waitFor(() => {
      expect(screen.getByText("Pick up some milk")).toBeInTheDocument();
    });

    const milk = screen.getByText("Pick up some milk");
    const butter = screen.getByText("Pick up some butter");
    const eggs = screen.getByText("Pick up some eggs");
    const vegetables = screen.getByText("Pick up some vegetables");

    // await userEvent.click(checkbox[2]);
    // await userEvent.click(checkbox[3]);

    await userEvent.click(filterList[0]);

    expect(milk).toBeInTheDocument();
    expect(butter).toBeInTheDocument();
    expect(eggs).toBeInTheDocument();
    expect(vegetables).toBeInTheDocument();
  });
});
