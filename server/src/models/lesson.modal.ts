// models/Lesson.ts
import { Schema, model, Types } from "mongoose";

const lessonTypes = ["video", "pdf"] as const;
type LessonType = (typeof lessonTypes)[number];

const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: lessonTypes, required: true },
    section: { type: Types.ObjectId, ref: "Section", required: true },
    url: { type: String, required: true }, // S3/Cloud URL or path
    duration: { type: String, default: "0 hrs", required: false },
  },
  { timestamps: true }
);

export default model("Lesson", lessonSchema);
