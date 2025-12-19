import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
