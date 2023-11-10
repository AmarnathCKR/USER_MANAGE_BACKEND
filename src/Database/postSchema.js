const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
