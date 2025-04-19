import apiClient from "../config/axiosConfig";
import { ApiResponse } from "../types/api";
import { Course, SelectedCourse } from "../types/course";
import { handleApiError } from "../utils/errorHandler";

// ✅ Fetch enrolled courses from API with response transformation
export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await apiClient.get<Course[]>("/courses/getUserCourses");
    const formattedResponse: ApiResponse<Course[]> = {
      success: true,
      data: response.data,
      message: "Courses fetched successfully",
    };
    return formattedResponse.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

//GET SELECTED COURSE USING COURSE ID
export const fetchSelectedCourse = async (
  courseId: string,
): Promise<SelectedCourse | null> => {
  console.log("Fetching selected course...");

  try {
    const response = await apiClient.get<{ additional: SelectedCourse }>(
      `/dashboardUsers/user/course-details/${courseId}`,
    );

    return response.data.additional ?? null; // Ensure we return an object, not an array
  } catch (error) {
    console.error("Error fetching course:", error);
    throw handleApiError(error);
  }
};
