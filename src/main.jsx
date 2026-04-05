import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { initAnalytics } from "./utils/analytics";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 2400,
        style: {
          background: "#231d18",
          color: "#fffaf3",
          borderRadius: "999px",
          padding: "14px 18px",
        },
      }}
    />
  </React.StrictMode>,
);

