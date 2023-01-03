import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthStoreProvider } from "./store/authStore";
import { WebsocketApiProvider } from "./store/websocket";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WebsocketApiProvider>
      <AuthStoreProvider>
        <App />
      </AuthStoreProvider>
    </WebsocketApiProvider>
  </React.StrictMode>
);
