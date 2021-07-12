const mongoose = require("mongoose");

const userDetailsModel = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true },
  emailId: {
    type: String,
    required: true,
    trim: true,
    uppercase: false,
    unique: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model(`tbl_userDetails`, userDetailsModel);
