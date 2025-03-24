import apiClient from "../config/axiosConfig";
import { ApiResponse } from "../types/api";
import { handleApiError } from "../utils/errorHandler";
import { useAuthStore } from "@context/authStore";
import { toast } from "sonner";

// Define the expected response type
interface EmailOtpResponse {
  success: boolean;
  message: string;
}

interface EmailVerifyResponse {
  token: string;
  isUpdated: boolean;
  message?: string; // Optional message field
}

export const sendEmailOtp = async (email: string): Promise<string> => {
  try {
    const response = await apiClient.post<ApiResponse<EmailOtpResponse>>(
      "/dashboardUsers/user/send-otp",
      { email } // Send email as an object
    );
    return response.data.additional?.message ?? "Failed to send OTP";
  } catch (error) {
    throw handleApiError(error);
  }
};

export const verifyEmail = async (email: string, otp: string): Promise<EmailVerifyResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<EmailVerifyResponse>>(
      "/dashboardUsers/user/verify-email",
      { email, otp }
    );

    // Show success toast with the message from the API
    toast.success(response.data.message || "Email verified successfully");


    // Validate that additional is an object and has required properties
    const additional = response.data.additional;
    if (!additional || typeof additional !== "object") {
      throw new Error("Invalid response format: additional data is not an object");
    }

    if (!("token" in additional) || !("isUpdated" in additional)) {
      throw new Error("Invalid response format: missing required fields");
    }

    return additional as EmailVerifyResponse;
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};


// 🛠 Move useAuthStore inside a function or a hook
export const useAuthActions = () => {
  const { login } = useAuthStore();
  return { login };
};
