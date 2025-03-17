import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import { Quizzes ,Quiz} from "../types/quiz";
import { handleApiError } from "@utils/errorHandler";

// FETCH QUIZZES USING COURSE ID
export const fetchAllQuizzes = async (courseId:string): Promise<Quizzes[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Quizzes[]>>(
      `quiz/quizzes/course/${courseId}`
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
export const fetchQuizQuestions = async (quizId:string): Promise<Quiz[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Quiz[]>>(
        `quiz/quizzes/${quizId}`
      );
  
      if (!response.data.additional) {
        throw new Error("Quiz Questions data is undefined");
      }
      
      return response.data.additional;
    } catch (error) {
      throw handleApiError(error);
    }
};