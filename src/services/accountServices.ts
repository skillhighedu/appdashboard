import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import { handleApiError } from "@utils/errorHandler";

export interface ForgotOtpResponse {
    success: boolean;
    message: string
}

export interface EmailVerifyResponse {
    verified:boolean;
    message: string
}

export interface ResetPassword {
  message: string
}

// OTP FOR FORGOT PASSWORD
export const forgotOtpService = async ( email:string): Promise<ForgotOtpResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<ForgotOtpResponse>>(
      "/dashboardUsers/user/send-forgot-otp", {email}
    );
    if (!response.data.additional) {
      throw new Error("Data is undefined");
    }
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};

// OTP FOR FORGOT PASSWORD
export const forgotEmailVerifyService = async ( email:string,otp:string): Promise<EmailVerifyResponse> => {
    try {
        console.log(email)
      const response = await apiClient.post<ApiResponse<EmailVerifyResponse>>(
        "/dashboardUsers/user/verify-forgot-otp", {email,otp}
      );
      if (!response.data.additional) {
        throw new Error("Data is undefined");
      }
      return response.data.additional;
    } catch (error) {
      throw handleApiError(error);
    }
};

//RESET NEW PASWORD
export const resetPassword = async ( email:string,newPassword:string): Promise<ResetPassword> => {
  try {
      console.log(email)
    const response = await apiClient.post<ApiResponse<ResetPassword>>(
      "/dashboardUsers/user/reset-password", {email,newPassword}
    );
    if (!response.data.additional) {
      throw new Error("Data is undefined");
    }
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};