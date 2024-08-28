import { Fragment, ReactNode } from "react";
import { useAuth } from "../hook/useAuth";
import { Navigate } from "react-router";

type Props = {
  children: ReactNode;
  overwrite?: ReactNode;
};

const PublicRoute = (props: Props) => {
  //   const { isInitialized } = useAuth();

  //   if (isInitialized) {
  //     return <Navigate to="/home" />;
  //   }

  return <Fragment>{props.children}</Fragment>;
};

const ProtectedRoute = (props: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Fragment>{props.children}</Fragment>;
};

export { PublicRoute, ProtectedRoute };
