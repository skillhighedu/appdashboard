import apiClient from "../config/axiosConfig";
import { ApiResponse } from "../types/api";
import { Project } from "../types/projects";
import { handleApiError } from "../utils/errorHandler";
import { ProjectSolution } from '../types/projects'

//FETCH PROJECTS
export const fetchProjects = async (courseId: string): Promise<Project[]> => {
    try {
        const response = await apiClient.get<ApiResponse<Project[]>>(
            `/courseProjects/course/projects/${courseId}`,
        );

        return response.data.additional ?? [];
    } catch (error) {
        throw handleApiError(error);
    }
};

//SUBMIT PROJECT SOLUTION 
export const submitProjectSolution = async (
    projectId: string,
    solution: ProjectSolution
): Promise<ProjectSolution[]> => {
    try {
        const response = await apiClient.post<ApiResponse<ProjectSolution[]>>(
            `/courseProjects/projects/${projectId}`,
            solution
        );
        console.log(response)
        return response.data.additional ?? [];
    } catch (error) {
        throw handleApiError(error);
    }
};
