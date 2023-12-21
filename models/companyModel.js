const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    logo: [
      {
        url: {
          type: String,
        },
        altText: {
          type: String,
        },
      },
    ],
  },

  { timestamps: true }
);

const Companies = mongoose.model("Companies", companySchema);

module.exports = Companies;
