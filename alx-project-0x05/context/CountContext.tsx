import { createContext, useContext,  useState, ReactNode } from "react"

interface CountContextProps {
  count: number
  increment: () => void
  decrement: () => void
}

export const CountContext = createContext<CountContextProps | undefined>(undefined)

export const CountProvider = ({ children }: { children: ReactNode}) => {

  const [count, setCount] = useState<number>(0)

  const increment = () => setCount((count ) =>count + 1)
  const decrement = () => setCount((count) => count > 0 ? count - 1 : 0)

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  )
}



export const useCount = () => {
  const context = useContext(CountContext)

  if (!context) {
    throw new Error("useCount must be within a Count Provider")
  }

  return context
}// context/CountContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

type State = {
  count: number;
};

type Action = { type: "increment" } | { type: "decrement" };

type CountContextType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const initialState: State = { count: 0 };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const CountContext = createContext<CountContextType | undefined>(undefined);

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: CountContextType = {
    count: state.count,
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
};

export const useCount = (): CountContextType => {
  const ctx = useContext(CountContext);
  if (!ctx) {
    throw new Error("useCount must be used within CountProvider");
  }
  return ctx;
};
