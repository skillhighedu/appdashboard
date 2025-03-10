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
  topic: Topic[];
}

export interface Module {
  id: string;
  moduleName: string;
  courseId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CourseData {
  courseName: string;
  courseThumbnail:string
  totalTopicsCount: number;
  modules: Module[];
}

export interface SelectedCourse {
  courseData: CourseData;
  topicProgress: number;
  projectProgress: number;
  quizProgress: number;
}
