export interface Lesson {
    id: string;
    title: string;
    description: string;
    pptLink: string;
    video: string;
    courseId: string;
    createdAt: string;
    updatedAt: string;
    Quiz: any[]; // Adjust type if you have a defined structure for quizzes
    topicCheckbox: any[]; // Adjust type if needed
  }
  
  export interface CourseLessonsResponse {
    lessons: Lesson[];
  }
  