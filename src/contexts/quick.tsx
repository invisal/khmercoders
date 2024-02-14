import { createContext, PropsWithChildren, useContext } from "react";

// This is meant to be a quick and dirty way to create a context and Provider
// Use this for very simple cases, if the logic is more complex
// consider creating a separate context to handle it 🫡

const Context = createContext<unknown | null>(null);

export const QuickProvider = <T extends Record<string, unknown>>({
  children,
  value,
}: PropsWithChildren<{
  value: T;
}>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useQuickContext<T>(): T {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useQuickContext must be used within a QuickProvider");
  }

  return context as T;
}
