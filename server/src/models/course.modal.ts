// models/Course.ts
import { Schema, model, Types } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    instructor: {type: String, required: false},
    price: { type: Number, required: true },
    rating: { type: String, default: "0" },
    studentEnrolled: { type: Number, default: 0 },
    totalDuration: {type: String, required: false, default: "0 hrs"},
    discount: { type: Number, default: 0 }, // percentage discount
    isPublished: { type: Boolean, default: false },
    sections: [{ type: Schema.Types.ObjectId, ref: "Section", default: [] }],
    validation: { type: String, default: "none" }, 
  },
  { timestamps: true }
);

export default model("Course", courseSchema);
