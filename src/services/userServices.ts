import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import { userProfile, Details } from "../types/user";
import { handleApiError } from "@utils/errorHandler";

//FETCH THE USE PROFILE
export const fetchUserProfile = async (): Promise<userProfile> => {
  try {
    const response = await apiClient.get<ApiResponse<userProfile>>(
      "/dashboardUsers/user/user-profile",
    );

    if (!response.data.additional) {
      throw new Error("Details data is undefined");
    }
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const setDetails = async (
  name: string,
  password: string,
): Promise<Details> => {
  try {
    const response = await apiClient.post<ApiResponse<Details>>(
      "/dashboardUsers/user/set-details",
      { name, password },
    );
    console.log(response);
    if (!response.data.additional) {
      throw new Error("Details data is undefined");
    }
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};
