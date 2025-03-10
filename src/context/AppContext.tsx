import React, { createContext, useState, ReactNode } from "react";
import { Course, SelectedCourse } from "../types/course";

interface StoreContextType {
  enrolledCourses: Course[];
  setEnrolledCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  selectedCourseData: SelectedCourse | null; // 👈 Now it's an object (or null)
  setSelectedCourseData: React.Dispatch<React.SetStateAction<SelectedCourse | null>>;
}

// Create Context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourseData, setSelectedCourseData] = useState<SelectedCourse | null>(null);

  const value = { enrolledCourses, setEnrolledCourses, selectedCourseData, setSelectedCourseData };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default StoreContext;
