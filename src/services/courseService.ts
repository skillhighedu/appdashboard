import apiClient from "../config/axiosConfig";
import { ApiResponse } from "../types/api";
import { Course } from "../types/course";
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
        console.log(formattedResponse)
        return formattedResponse.data; 
    } catch (error) {
        throw handleApiError(error);
    }
};
