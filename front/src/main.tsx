import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthStoreProvider } from "./store/authStore";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthStoreProvider>
      <App />
    </AuthStoreProvider>
  </React.StrictMode>
);
