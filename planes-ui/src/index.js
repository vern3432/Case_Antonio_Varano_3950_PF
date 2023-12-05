import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Login";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/reservations",
    element: <div>reservations</div>,
  },
  {
    path: "/schedule",
    element: <div>schedule</div>,
  },
  {
    path: "/about",
    element: <div>about</div>,
  },
  {
    path: "/contact",
    element: <div>contact</div>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
