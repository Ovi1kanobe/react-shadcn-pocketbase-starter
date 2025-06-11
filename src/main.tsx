import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClientContextProvider } from "./context/client.tsx";
import { AuthContextProvider } from "./context/auth.tsx";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <TooltipProvider delayDuration={0}>
      <ClientContextProvider>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
      </ClientContextProvider>
    </TooltipProvider>
  </StrictMode>
);
