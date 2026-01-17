// models/Enrollment.ts
import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    enrolledAt: { type: Date, default: Date.now },
    approvedAt: { type: Date, default: null },
    rejectedAt: { type: Date, default: null },

    progress: { type: Number, default: 0 }, // percentage
    completed: { type: Boolean, default: false },

    lastAccessedLesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },

    // Payment details
    paymentDetails: {
      payeeName: String,
      transactionId: String,
      amount: Number,
      submittedAt: { type: Date, default: Date.now },
    },

    // Approval/Rejection notes
    approvalNotes: { type: String, default: null },
    rejectionReason: { type: String, default: null },
  },
  { timestamps: true },
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default model("Enrollment", enrollmentSchema);
