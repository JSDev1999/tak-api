import mongoose from "mongoose";

var fileSchema = new mongoose.Schema(
  {
    file: String,
  },
  { timestamps: true }
);

export default mongoose.model("files", fileSchema);
