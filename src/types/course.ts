
export interface Topic {
    id: string;
}

export interface Course {
    id: string;
    courseName: string;
    courseDescription: string;
    courseThumbnail: string;
    courseCount: number;
    topicCount: number;
    topic : Topic[]
}