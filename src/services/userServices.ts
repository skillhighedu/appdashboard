import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import {userProfile} from "../types/user"
import { handleApiError } from "@utils/errorHandler";


//FETCH THE USE PROFILE 
export const fetchUserProfile = async (): Promise<userProfile> => {
  try {
  
    
    const response = await apiClient.get<ApiResponse<userProfile >>(
      "/dashboardUsers/user/user-profile"
    );

    if (!response.data.additional) {
      throw new Error("User profile data is undefined");
    }
    return response.data.additional;
    
  } catch (error) {
    throw handleApiError(error);
  }
};
