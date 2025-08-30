import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./context/ThemeContext.jsx";
import "./index.css";
import App from "./App.jsx";

// Initialize the QueryClient here
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // disable automatic retries
      refetchOnWindowFocus: false, // don't refetch when window gains focus
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
