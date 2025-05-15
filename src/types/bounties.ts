import { JSX } from "react/jsx-runtime";


export interface Bounty {
  length: number;
  map(arg0: (bounty: Bounty, index: number) => JSX.Element): import("react").ReactNode;

  id: string;
  name: string;
  link: string;
  description: string;
  slots: number;
  isSlotsAvailable: boolean;
  courseId: string;
  amount: number;
  status: 'OPEN' | 'CLOSED'; 
  type: 'FEATURE' | 'NORMAL'; 
  expiryDate: string;
  createdAt: string;  
  updatedAt: string; 

}

export type BountyDetails = {
  id: string;
  courseId: string;
  name: string;
  description: string;
  type: "FEATURE" | string;
  status: "OPEN" | "CLOSED" | string;
  link: string;
  slots: number;
  isSlotsAvailable: boolean;
  amount: number;
  expiryDate: string;
};

export type AppliedBounty = {
  id: string;
  name:string;
  description: string;
  type: string;
  expiryDate: string;
  status: string;
  amount: number;
  link: string;
  isBountyAwarded: boolean;
  bountyId: string;
  courseId: string;
  userId: string;
  bounty:BountyDetails
  submittedLink:string

};


