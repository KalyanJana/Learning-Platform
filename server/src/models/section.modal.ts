// models/Section.ts
import { Schema, model, Types } from "mongoose";

const sectionSchema = new Schema({
  course: { type: Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  duration: { type: String, required: false, default: "0 mins" },
  lessons: [{ type: Types.ObjectId, ref: "Lesson", default: [] }],
  createdAt: { type: Date, default: Date.now },
});

export default model("Section", sectionSchema);
