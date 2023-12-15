const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    active: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },

    status: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },
    plan: {
      type: String,
      enum: ["free", "silver", "gold"],
      default: "free",
    },
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
