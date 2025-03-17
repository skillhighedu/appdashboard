export interface Solution {
    id: string;
    projectId: string;
    explanation: string;
    githubLink: string;
    isCompleted: boolean;
    reviewState: "FAILED" | "SUCCESSFUL";
    reviewNotes: string | null; 
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Project {
    id: string;
    courseId: string;
    projectName: string;
    projectLink: string;
    createdAt: string;
    updatedAt: string;
    solutions: Solution[];
}


export interface ProjectSolution {
    githubLink: string;
    explanation: string;
}