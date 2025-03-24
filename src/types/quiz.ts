// quiz.ts
export interface Answer {
  id: string;
  text: string;
  // Add other fields if present in your API response
  isCorrect?: boolean; // Optional, if included
  createdAt?: string;
  updatedAt?: string;
}

export interface Questions {
  id: string;
  quizId: string;
  text: string;
  correctAnswerId: string;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
}

export interface Quiz {
  id: string;
  topicId: string;
  courseId: string;
  createdAt: string;
  questions: Questions[];
}

export type SingleQuizArray = Quiz[]; // A
// Type for a single question
interface Question {
  id: string;
}

// Type for a quiz which contains an ID and array of questions
interface Quizzes {
  id: string;
  questions: Question[];
}

// Since your data is an array of quizzes
export type QuizArray = Quizzes[];

