import apiClient from "@config/axiosConfig";
import { ApiResponse } from "../types/api";
import { Bounty, AppliedBounty } from "../types/bounties";
import { handleApiError } from "@utils/errorHandler";
import { toast } from "sonner";

//FETCH ALL BOUNTIES
export const fetchBounties = async (courseId: string): Promise<Bounty> => {
    try {
        const response = await apiClient.get<ApiResponse<Bounty>>(`/bounties/bounty/${courseId}`);
    

        if (!response.data.additional) {
            throw new Error("Bounties data is undefined");
        }
        return response.data.additional;
    } catch (error) {
        throw handleApiError(error);
    }
};

//REG FOR BOUNTY
export const bountyApplication = async (bountyId: string, courseId: string): Promise<Bounty> => {
    try {

        const response = await apiClient.post<ApiResponse<Bounty>>(`/bounties/bounty-application/${bountyId}`, { courseId });


        if (!response.data.additional) {
            throw new Error("Bounties data is undefined");
        }
        toast.success(response.data.message);
        return response.data.additional;
    } catch (error) {
        throw handleApiError(error);
    }
};

// Cancel bounty application
export const cancelBountyApplication = async (
    applicationId: string,
    bountyId: string
): Promise<Bounty> => {
    try {
        const response = await apiClient.delete<ApiResponse<Bounty>>(
            `/bounties/cancel-application/${applicationId}`,
            {
                data: { bountyId },
            }
        );

        toast.success(response.data.message);
        if (!response.data.additional) {
            throw new Error("Bounties data is undefined");
        }

        return response.data.additional;
    } catch (error) {
        throw handleApiError(error);
    }
};


export const bountySubmission = async (
    bountyId: string,
    submittedLink: string,
    notes: string,
    applicationId:string
): Promise<Bounty> => {
    console.log(bountyId)
    try {
        const response = await apiClient.post<ApiResponse<Bounty>>(
            `/bounties/submit-bounty/${bountyId}`,
            {

                    submittedLink,
                    notes,
                    applicationId

            }
        );

        toast.success(response.data.message);
        if (!response.data.additional) {
            throw new Error("Bounties data is undefined");
        }

        return response.data.additional;
    } catch (error) {
        throw handleApiError(error);
    }
};
//GET APPLIED BOUNTIES
export const getAppliedBounties = async (courseId: string): Promise<AppliedBounty> => {
    try {

        const response = await apiClient.get<ApiResponse<AppliedBounty>>(`/bounties/bounty-application/${courseId}`);

        if (!response.data.additional) {
            throw new Error("Bounties data is undefined");
        }
        console.log(response.data.additional);
        return response.data.additional;
    } catch (error) {
        throw handleApiError(error);
    }
};
