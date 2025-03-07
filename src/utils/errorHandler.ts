import axios from "axios";
import { ApiError } from "../types/api";

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status || 500,
    };
  } else {
    return { message: "Unexpected error", status: 500 };
  }
};
