import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 200,
  },
  thumbnailUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

export default mongoose.model("Job", JobSchema);
