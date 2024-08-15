import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import "./index.css";
import { Toaster } from "react-hot-toast";
// import axios from "axios";
// axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster />
  </React.StrictMode>
);
