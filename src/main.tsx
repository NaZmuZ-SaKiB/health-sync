import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";
import UserProvider from "./contexts/UserProvider";

const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider
        defaultSetOptions={{
          path: "/",
          httpOnly: process.env.NODE_ENV === "production",
        }}
      >
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </CookiesProvider>
      <Toaster closeButton richColors />
    </ApolloProvider>
  </StrictMode>,
);
