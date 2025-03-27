import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import { handleApiError } from "@utils/errorHandler";
import { toast } from "sonner";

type ContactType = {
  name: string;
  email: string;
  phone: string;
  message: string;
  category: StudentCategory;
};

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
export const sendContactService = async (
  contact: ContactType,
): Promise<ContactResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<ContactResponse>>(
      "/contacts/addContact",
      contact,
    );

    if (!response.data.additional) {
      throw new Error("Data is undefined");
    }
    toast.success(response.data.message);
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};
