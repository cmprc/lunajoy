import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App";
import { Dialog } from "./components/ui/dialog";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Dialog>
      <App />
    </Dialog>
    <Toaster />
  </React.StrictMode>
);
