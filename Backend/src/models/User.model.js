import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // MongoDB auto-creates _id, no need to define it

    name: {
      type: String,
      required: true,
      trim: true,
    },

    student_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["student", "club-lead", "admin"],
      default: "student",
    },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    clubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false, // only createdAt as you asked
    },
  }
);

export default mongoose.model("User", userSchema);
