// models/Course.ts
import { Schema, model, Types } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bannerUrl: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 5 }, // percentage discount
    isPublished: { type: Boolean, default: false },
    instructor: { type: Schema.Types.ObjectId, ref: "User" }, // or 'admin'
    enrolledUsers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    // Optionally: Array for search perf, but usually populated
    sections: [{ type: Schema.Types.ObjectId, ref: "Section", default: [] }],
    validation: { type: String, default: "none" }, // for certificates
  },
  { timestamps: true }
);

export default model("Course", courseSchema);
