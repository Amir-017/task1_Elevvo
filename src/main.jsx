import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App";
import { MainLayout } from "./Layouts/MainLayout";
import { Projects } from "./Pages/Projects";
import { Profile } from "./Pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element:<Dashboard />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
