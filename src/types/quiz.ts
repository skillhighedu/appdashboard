// Represents a single answer option for a question
export type Answer = {
  id: string;
  text: string;
};

// Represents a single quiz question
export type QuizQuestion = {
  id: string;
  quizId: string;
  text: string;
  correctAnswerId: string;
  answers: Answer[]; // List of possible answers
  createdAt: string;
  updatedAt: string;
};

// Represents a single quiz
export type Quiz = {
  id: string;
  topicId: string;
  courseId: string;
  createdAt: string;
  questions: QuizQuestion[]; // List of questions for this quiz
};

// Represents a collection of quizzes (if needed)
export type QuizList = {
  id: string;
  questions: string[]; // This structure seems incorrect; consider using QuizQuestion[]
};

// Represents multiple quizzes in a structured format
export type Quizzes = {
  id: string;
  questions: QuizQuestion[]; // List of quiz questions
  quizzes: Quiz[]; // List of quizzes
};
