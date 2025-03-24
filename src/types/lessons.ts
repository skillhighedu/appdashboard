export interface Lesson {
  topicCheckbox: boolean;
  id: string;
  title: string;
  description: string;
  pptLink: string;
  video: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseLessonsResponse {
  lessons: Lesson[];
}
