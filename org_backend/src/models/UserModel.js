const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    role_id: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    profile_image: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
