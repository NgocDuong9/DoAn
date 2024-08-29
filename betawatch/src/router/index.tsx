import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import { AuthLayout } from "../layout/auth-layout";
import MainLayout from "../layout/main-layout";
import { ProtectedRoute, PublicRoute } from "./role-router";
import Brand from "../page/brand";

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
        element: <p>loginnnn</p>,
      },
      {
        path: "/signin",
        element: <></>,
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
