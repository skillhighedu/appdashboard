import apiClient from "../config/axiosConfig";
import { handleApiError } from "../utils/errorHandler";
import { ApiResponse } from "../types/api";

interface QuestionPayload {
  courseId: string;
  question: string;
  topicId: string;
}

export const sendQuestionService = async (
  payload: QuestionPayload,
): Promise<ApiResponse<QuestionPayload | null>> => {
  try {
    const { courseId, topicId, question } = payload;
    const response = await apiClient.post<QuestionPayload>(
      `/dashboardUsers/topics/${topicId}/questions/addQuestion`,
      { question, courseId },
    );

    return {
      success: true,
      data: response.data ?? null,
    };
  } catch (error) {
    console.error("Error sending question:", error);
    throw handleApiError(error);
  }
};
