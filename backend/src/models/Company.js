const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  hrAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
