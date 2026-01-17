// src/features/student/types/course.types.ts
export interface Lesson {
  id: string;
  title: string;
  type: "video" | "pdf";
  url: string;
  duration?: number; // in seconds for video
  completed: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  price: string;
  sections: CourseSection[];
  totalDuration: string;
  studentsEnrolled: number;
}

export interface PaymentDetails {
  courseId: string;
  courseName: string;
  amount: string;
  upiId: string;
  qrCode: string;
}
