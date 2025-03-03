import { createContext, useContext, useState, ReactNode } from "react";

// Define StoreContext type
interface StoreContextType {
  cart: any[];
  addToCart: (item: any) => void;
}

// Create Context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {

  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => setCart([...cart, item]);

  return (
    <StoreContext.Provider value={{ cart, addToCart }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook for using the StoreContext
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
