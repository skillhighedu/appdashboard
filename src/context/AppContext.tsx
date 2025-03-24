import React, { createContext, useState, ReactNode } from "react";
import { Course, SelectedCourse } from "../types/course";
import { Lesson } from "../types/lessons";
import { userProfile } from "../types/user";
import { Quiz, QuizArray } from "../types/quiz"; // Updated import
import { Project } from "../types/projects";

interface StoreContextType {
  enrolledCourses: Course[];
  setEnrolledCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  selectedCourseData: SelectedCourse | null;
  setSelectedCourseData: React.Dispatch<
    React.SetStateAction<SelectedCourse | null>
  >;
  courseLessons: Lesson[] | null;
  setCourseLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>;
  selectedLesson: Lesson | null;
  setSelectedLesson: (lesson: Lesson) => void;
  userProfile: userProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<userProfile | null>>;

  // QUIZ LIST
  quizzes: QuizArray | null; // Array of quizzes
  setQuizzes: React.Dispatch<React.SetStateAction<QuizArray | null>>;

  // QUIZ QUESTIONS
  quizQuestions: Quiz | null; // Single quiz object
  setQuizQuestion: (quiz: Quiz) => void;

  projects: Project[] | null;
  setProjects: React.Dispatch<React.SetStateAction<Project[] | null>>;

  email: string | "";
  setEmail: React.Dispatch<React.SetStateAction<string | "">>;

  isForgotPassword: boolean;
  setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;

  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create Context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourseData, setSelectedCourseData] =
    useState<SelectedCourse | null>(null);
  const [courseLessons, setCourseLessons] = useState<Lesson[] | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [userProfile, setUserProfile] = useState<userProfile | null>(null);
  const [quizzes, setQuizzes] = useState<QuizArray | null>(null); // Fixed to QuizArray
  const [quizQuestions, setQuizQuestion] = useState<Quiz | null>(null); // Fixed to Quiz
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [email, setEmail] = useState<string | "">("");
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const value = {
    enrolledCourses,
    setEnrolledCourses,
    selectedCourseData,
    setSelectedCourseData,
    courseLessons,
    setCourseLessons,
    selectedLesson,
    setSelectedLesson: (lesson: Lesson) => setSelectedLesson(lesson), // Simplified setter
    userProfile,
    setUserProfile,
    quizzes,
    setQuizzes,
    quizQuestions,
    setQuizQuestion: (quiz: Quiz) => setQuizQuestion(quiz), // Simplified setter
    projects,
    setProjects,
    email,
    setEmail,
    isForgotPassword,
    setIsForgotPassword,
    isVerified,
    setIsVerified,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContext;
