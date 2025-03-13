import React, { createContext, useState, ReactNode } from "react";
import { Course, SelectedCourse } from "../types/course";
import { Lesson} from "../types/lessons";
import { userProfile } from "../types/user";


interface StoreContextType {
  enrolledCourses: Course[];
  setEnrolledCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  selectedCourseData: SelectedCourse | null; 
  setSelectedCourseData: React.Dispatch<React.SetStateAction<SelectedCourse | null>>;
  courseLessons : Lesson[] | null;
  setCourseLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>;
  selectedLesson: Lesson | null;
  setSelectedLesson: (lesson: Lesson) => void;
  userProfile: userProfile | null;
  setUserProfile:React.Dispatch<React.SetStateAction<userProfile | null >>

} 

// Create Context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {

  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourseData, setSelectedCourseData] =useState<SelectedCourse | null>(null);
  const [courseLessons, setCourseLessons] =useState<Lesson[] | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [userProfile, setUserProfile] = useState<userProfile | null>(null);


  const value = {
    enrolledCourses,
    setEnrolledCourses,
    selectedCourseData,
    setSelectedCourseData,
    courseLessons,
    setCourseLessons,
    selectedLesson,
    setSelectedLesson,
    userProfile,
    setUserProfile
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContext;
