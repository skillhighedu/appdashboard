import { Course } from "../types/course";
import React, { createContext, useState, ReactNode } from "react";


interface StoreContextType {
  enrolledCourses: Course[];
  setEnrolledCourses: React.Dispatch<React.SetStateAction<Course[]>>
}

//CREATING STORE CONTEXT
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const value = { enrolledCourses, setEnrolledCourses }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
