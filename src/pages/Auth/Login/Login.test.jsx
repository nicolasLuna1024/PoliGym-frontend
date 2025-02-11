import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, test } from 'vitest'; // Si usas Vitest
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import AuthContext from "../../../contexts/AuthProvider";
import axios from "axios";
import { ToastContainer } from "react-toastify";

// Mock de `axios.post`
vi.mock("axios");

describe("Login Component", () => {
  let setAuth, setToken, navigateMock;

  beforeEach(() => {
    setAuth = vi.fn();
    setToken = vi.fn();
    navigateMock = vi.fn();

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ setAuth, setToken }}>
          <ToastContainer />
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });


  test("Permite escribir en los campos de email y contraseña", () => {
    const emailInput = screen.getByPlaceholderText("ejemplo@email.com");
    const passwordInput = screen.getByPlaceholderText("********");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("Llama a la API y redirige según el rol", async () => {
    axios.post.mockResolvedValue({
      data: { token: "fake-token", user: { role: "cliente", username: "testuser" } },
    });

    const emailInput = screen.getByPlaceholderText("ejemplo@email.com");
    const passwordInput = screen.getByPlaceholderText("********");
    const submitButton = screen.getByRole("button", { name: "Ingresar" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(setAuth).toHaveBeenCalled();
      expect(setToken).toHaveBeenCalledWith("fake-token");
      expect(localStorage.getItem("token")).toBe("fake-token");
    });
  });

  test("Muestra un mensaje de error si las credenciales son incorrectas", async () => {
    axios.post.mockRejectedValue(new Error("Creedenciales incorrectas"));

    const submitButton = screen.getByRole("button", { name: "Ingresar" });

    fireEvent.click(submitButton);
  });
});
