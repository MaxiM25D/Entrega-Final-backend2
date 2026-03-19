import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },

  token: {
    type: String,
    required: true,
    unique: true
  },

  expiresAt: {
    type: Date,
    required: true
  },

  used: {
    type: Boolean,
    default: false
  }

});

export const PasswordReset = mongoose.model(
  "PasswordReset",
  passwordResetSchema
);