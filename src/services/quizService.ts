import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import { QuizArray, Quiz } from "../types/quiz";
import { handleApiError } from "@utils/errorHandler";

interface Answers {
  questionId: string;
  answerId: string;
}

// FETCH QUIZZES USING COURSE ID
export const fetchAllQuizzes = async (courseId: string): Promise<QuizArray> => {
  try {
    const response = await apiClient.get<ApiResponse<QuizArray>>(
      `quiz/quizzes/course/${courseId}`,
    );

    if (!response.data.additional) {
      throw new Error("Quizzes data is undefined");
    }

    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};

// FETCH QUIZZES USING COURSE ID
export const fetchQuizQuestions = async (quizId: string): Promise<Quiz> => {
  try {
    const response = await apiClient.get<ApiResponse<Quiz>>(
      `quiz/quizzes/${quizId}`,
    );
    console.log(response);

    if (!response.data.additional) {
      throw new Error("Quiz Questions data is undefined");
    }

    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};

// FETCH QUIZZES USING COURSE ID
export const submitQuiz = async (
  quizId: string,
  answers: Answers[],
): Promise<string> => {
  console.log(answers);
  try {
    const response = await apiClient.post<ApiResponse<string>>(
      `quiz/quizzes/submitResult/${quizId}`,
      { answers },
    );

    if (!response.data.additional) {
      throw new Error("Quiz Answers data is undefined");
    }
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};
