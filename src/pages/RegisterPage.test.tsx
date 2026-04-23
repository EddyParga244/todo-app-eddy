import { AuthContextProvider } from "@/context/AuthContext";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { todoApi } from "@/api/todoApi";
import { RegisterPage } from "./RegisterPage";
import { LoginPage } from "./LoginPage";

vi.mock("@/api/todoApi");

describe("RegisterPage", () => {
  test("should render page with email and password inputs", () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <RegisterPage></RegisterPage>
        </BrowserRouter>
      </AuthContextProvider>,
    );
    const email = screen.getByRole("textbox");
    const password = screen.getByLabelText("Password");
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test("should call register when form is sent", async () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <RegisterPage></RegisterPage>
        </BrowserRouter>
      </AuthContextProvider>,
    );

    const email = screen.getByRole("textbox");
    const password = screen.getByLabelText("Password");
    const button = screen.getByRole("button");

    const user = userEvent.setup();

    vi.mocked(todoApi.post).mockResolvedValueOnce({
      data: { access_token: "fake-token" },
    });

    await user.type(email, "test@test.com");
    await user.type(password, "Test12345!");
    await userEvent.click(button);

    expect(vi.mocked(todoApi.post)).toHaveBeenCalledWith("/api/auth/register", {
      email: "test@test.com",
      password: "Test12345!",
    });
  });

  test("should redirect to '/login' after successful register", async () => {
    render(
      <AuthContextProvider>
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route path="/register" element={<RegisterPage></RegisterPage>} />
            <Route path="/login" element={<LoginPage></LoginPage>} />
          </Routes>
        </MemoryRouter>
      </AuthContextProvider>,
    );

    const email = screen.getByRole("textbox");
    const password = screen.getByLabelText("Password");
    const button = screen.getByRole("button");

    const user = userEvent.setup();

    vi.mocked(todoApi.post).mockResolvedValueOnce({
      data: { access_token: "fake-token" },
    });

    await user.type(email, "test@test.com");
    await user.type(password, "Test12345!");
    await userEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  });
});
