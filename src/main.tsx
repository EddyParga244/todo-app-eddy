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
