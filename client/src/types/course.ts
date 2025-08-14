export interface Lesson {
  title: string;
  type: "video" | "pdf";
  url: string;
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  _id: string;
  title: string;
  bannerImage: string;
  description: string;
  offerDetails?: string;
  price: number;
  numVideos: number;
  sections?: Section[];
  purchased?: boolean;
}