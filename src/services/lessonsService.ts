import apiClient from "../config/axiosConfig";
import { ApiResponse } from "../types/api";
import { Lesson } from "../types/lessons";
import { handleApiError } from "../utils/errorHandler";

export const fetchCourseTopics = async (courseId: string): Promise<Lesson[]> => {
  try {
    // Ensure response type includes { topics: Lesson[] }
    const response = await apiClient.get<ApiResponse<Lesson[] >>(
      `/courses/getCourseTopics/${courseId}`
    );

    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
