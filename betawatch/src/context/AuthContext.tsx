import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextValue {
  user: string | null;
  isInitialized: Boolean;
  loading: boolean;
  isMobile: boolean;
}

const initialState = {
  user: null,
  isInitialized: false,
  isMobile: false,
  loading: false,
};

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, _setState] = useState<AuthContextValue>(initialState);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const context = {
    ...state,
    isMobile,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
