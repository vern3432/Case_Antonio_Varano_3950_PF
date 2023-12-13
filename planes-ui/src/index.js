import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Reservations from "./components/reservations/Reservations";
import Contact from "./components/contact/Contact";
import Schedule from "./components/schedule/Schedule";
import About from "./components/about/About";
import User_Profile from "./components/user_profile/User_Profile";
import Navigation from "./components/navigation/Navigation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/reservations",
    element: (
      <>
        <Navigation />
        <Reservations />
      </>
    ),
  },
  {
    path: "/schedule",
    element: (
      <>
        <Navigation />
        <Schedule />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navigation />
        <About />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <Navigation />
        <Contact />
      </>
    ),
  },
  {
    path: "/user_profile",
    element: (
      <>
        <Navigation />
        <User_Profile/>
      </>
    ),
  },

  {
    // If path is not found goes to the login page
    path: "*",
    element: <Login />,
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
