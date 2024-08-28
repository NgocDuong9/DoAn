"use client";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const authPath = ["/login", "/signup"];

function Layout({ children }: LayoutProps) {
  // const router = window && window.location;

  return <div className="">{children}</div>;
}

export default Layout;
