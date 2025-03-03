import { createContext, useState, ReactNode } from "react";

// Define StoreContext type
interface StoreContextType {
  cart: string[];
  addToCart: (item: string) => void;
}

// Create Context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<string[]>([]);
  const addToCart = (item: string) => setCart([...cart, item]);

  return (
    <StoreContext.Provider value={{ cart, addToCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
