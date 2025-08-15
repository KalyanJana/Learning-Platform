import { Schema, model, Document } from "mongoose";

export interface ILesson {
  title: string;
  type: "video" | "pdf";
  url: string;
}

export interface ISection {
  title: string;
  lessons: ILesson[];
}

export interface ICourse extends Document {
  title: string;
  bannerImage: string;
  description: string;
  offerDetails?: string;
  price: number;
  numVideos: number;
  sections?: ISection[];
}

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  type: { type: String, enum: ["video", "pdf"], required: true },
  url: { type: String, required: true },
});

const sectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  lessons: { type: [lessonSchema], default: [] },
});

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    bannerImage: { type: String, required: true },
    description: { type: String, required: true },
    offerDetails: String,
    price: { type: Number, required: true },
    numVideos: { type: Number, required: true },
    sections: { type: [sectionSchema], default: [] },
  },
  { timestamps: true }
);

export const CourseModel = model<ICourse>("Course", courseSchema);