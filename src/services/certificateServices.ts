import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import { handleApiError } from "@utils/errorHandler";
import { toast } from "sonner";
import { CertificateDetails } from "../types/certificate";

// SEND CONTACT DATA TO THE SERVER
export const generateCerticateService = async (
  courseId: string,
): Promise<CertificateDetails> => {
  try {
    const response = await apiClient.get<ApiResponse<CertificateDetails>>(
      `/certificate/generate-certificate/${courseId}`,
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

// SEND CONTACT DATA TO THE SERVER
export const verifyCertificateService = async (
  cid: string,
): Promise<CertificateDetails> => {
  try {
    const response = await apiClient.get<ApiResponse<CertificateDetails>>(
      `/certificate/verify-certificate/${cid}`,
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
