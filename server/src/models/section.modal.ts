// models/Section.ts
import { Schema, model, Types } from "mongoose";

const sectionSchema = new Schema({
  course: { type: Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true }, // position in course
  lessons: [{ type: Types.ObjectId, ref: "Lesson", default: [] }],
  createdAt: { type: Date, default: Date.now },
});

export default model("Section", sectionSchema);
