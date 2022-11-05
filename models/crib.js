const mongoose = require("mongoose");
const CribSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Crib", CribSchema);
