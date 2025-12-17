import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    collegeName: {
      type: String,
      required: true,
      trim: true,
    },

    clubName: {
      type: String,
      trim: true,
    },

    // 🔗 EVENT LINK (NEW)
    link: {
      type: String,
      trim: true,
      default: "",
    },

    banner: {
      public_id: String,
      url: String,
    },

    registrations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default mongoose.model("Event", eventSchema);
