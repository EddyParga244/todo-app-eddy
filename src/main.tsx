import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "./AppProviders";

import "./index.css";
import { TodoRouter } from "./router/TodoRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <TodoRouter></TodoRouter>
    </AppProviders>
  </StrictMode>,
);

/*
Backend:

CORS_ORIGINS → cambiar a la URL del frontend en Vercel/Netlify
JWT_COOKIE_SECURE = True en producción (requiere HTTPS)
samesite='Lax' o 'Strict' en producción (no 'None')
El método de logout cambió de POST a DELETE
JWT_COOKIE_CSRF_PROTECT = False (verificar si quieres reactivarlo en producción)
expired_callback cambió a 401
invalid_callback cambió a 422

Frontend:

VITE_API_URL → cambiar a la URL del backend en Render
Remover el proxy de vite.config.ts o ajustarlo para producción
withCredentials: true en todoApi

*/