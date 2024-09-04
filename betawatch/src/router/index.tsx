import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import { AuthLayout } from "../layout/auth-layout";
import MainLayout from "../layout/main-layout";
import { ProtectedRoute, PublicRoute } from "./role-router";
import Brand from "../page/brand";
import Login from "../page/login/Login";
import Signin from "../page/login/Signin";
import Home from "../page/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <MainLayout />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/brand",
        element: <Brand />,
      },
      {
        path: "/brand:id",
        element: <></>,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/order", element: <>order</> },
      { path: "/checkout", element: <>checkout</> },
    ],
  },
]);
