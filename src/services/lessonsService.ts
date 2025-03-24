import apiClient from "../config/axiosConfig";
import { ApiResponse } from "../types/api";
import { Lesson } from "../types/lessons";
import { handleApiError } from "../utils/errorHandler";

export const fetchCourseTopics = async (
  courseId: string,
): Promise<Lesson[]> => {
  try {
    // Ensure response type includes { topics: Lesson[] }
    const response = await apiClient.get<ApiResponse<Lesson[]>>(
      `/courses/getCourseTopics/${courseId}`,
    );

    return response.data.additional ?? [];
  } catch (error) {
    throw handleApiError(error);
  }
};

//UPDATE THE CHECKBOX TRUE OR FALSE
export const updateLessonCheckbox = async (
  topicId: string,
  completed: boolean,
  courseId: string,
): Promise<Lesson[]> => {
  try {
    const response = await apiClient.post<ApiResponse<Lesson[]>>(
      `dashboardUsers/user/lessons/lessonCheckbox/${topicId}`,
      { completed, courseId },
    );

    return response.data.additional ?? [];
  } catch (error) {
    throw handleApiError(error);
  }
};
