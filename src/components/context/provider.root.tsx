import { ReactNode } from "react";

import AuthProvider from "./auth.context";

export default function ProviderRoot({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
