export interface Lesson {
  topicCheckbox: boolean;
  id: string;
  title: string;
  description: string;
  pptLink: string;
  video: string;
  topicQuestion:TopicQuestion[];
  courseId: string;
  createdAt: string;
  updatedAt: string;

}

export interface CourseLessonsResponse {
  lessons: Lesson[];
}

export interface TopicQuestion {
  id: string;
  question: string;
  answer: string;
  lessonId: string;
  studentName:string;
  createdAt: string;
  updatedAt: string;
}
