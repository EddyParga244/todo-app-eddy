import { AuthContextProvider } from "@/context/AuthContext";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { todoApi } from "@/api/todoApi";
import { LoginPage } from "./LoginPage";

vi.mock("@/api/todoApi");

describe("LoginPage", () => {
  test("should render page with email and password inputs", () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <LoginPage></LoginPage>
        </BrowserRouter>
      </AuthContextProvider>,
    );
    const email = screen.getByRole("textbox");
    const password = screen.getByLabelText("Password");
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test("should call login when form is sent", async () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <LoginPage></LoginPage>
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

    expect(vi.mocked(todoApi.post)).toHaveBeenCalledWith("/api/auth/login", {
      email: "test@test.com",
      password: "Test12345!",
    });
  });

  test("should redirect to '/' after successful login", async () => {
    render(
      <AuthContextProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LoginPage></LoginPage>} />
            <Route path="/" element={<div>TodoApp</div>} />
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
