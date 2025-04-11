import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import { handleApiError } from "@utils/errorHandler";
import { toast } from "sonner";


export enum StudentCategory {
  EXISTING = "EXISTING",
  NEWSTUDENT = "NEWSTUDENT",
}

type ContactResponse = {
  name: string;
  email: string;
  phone: string;
  message: string;
  category: string;
};

// SEND CONTACT DATA TO THE SERVER
export const generateCerticateService = async (
  courseId :string
): Promise<ContactResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<ContactResponse>>(
      `/certificate/generate-certificate/${courseId}`);

    if (!response.data.additional) {
      throw new Error("Data is undefined");
    }
    toast.success(response.data.message);
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};
