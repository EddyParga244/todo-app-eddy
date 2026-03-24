import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach } from "vitest";
import { ToggleTheme } from "./ToggleTheme";
import { ThemeContextProvider } from "@/context/ThemeContext";
import "../../mocks/setupMock";

describe("ToggleTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render Toggle button correctly", () => {
    render(
      <ThemeContextProvider>
        <ToggleTheme></ToggleTheme>
      </ThemeContextProvider>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("should change to dark mode when button pressed", async () => {
    render(
      <ThemeContextProvider>
        <ToggleTheme></ToggleTheme>
      </ThemeContextProvider>,
    );
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  test("should change to light mode when button pressed twice", async () => {
    render(
      <ThemeContextProvider>
        <ToggleTheme></ToggleTheme>
      </ThemeContextProvider>,
    );
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);

    await user.click(button);

    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
