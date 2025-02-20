import { createRoot } from "react-dom/client";
import { Dialog } from "./components/ui/dialog";
import { Toaster } from "./components/ui/toaster";
import { App } from "./App";
import { StrictMode } from "react";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dialog>
      <App />
    </Dialog>
    <Toaster />
  </StrictMode>
);
