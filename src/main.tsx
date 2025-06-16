import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { ClientContextProvider } from "./context/client.tsx";
import { AuthContextProvider } from "./context/auth.tsx";
import { AdminAuthContextProvider } from "./context/adminAuth.tsx";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { DialogProvider } from "./context/global-dialog.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <TooltipProvider delayDuration={0}>
        <ClientContextProvider>
          <AuthContextProvider>
            <AdminAuthContextProvider>
              <SidebarProvider>
                <DialogProvider>
                  <App />
                </DialogProvider>
              </SidebarProvider>
            </AdminAuthContextProvider>
          </AuthContextProvider>
        </ClientContextProvider>
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>
);
