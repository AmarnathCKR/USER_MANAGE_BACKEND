const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    status: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
