const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      bio: { type: String, default: "" },
      profilePicture: { type: String, default: "" },
      socialLinks: {
        youtube: { type: String, default: "" },
        instagram: { type: String, default: "" },
        facebook: { type: String, default: "" },
        gmail: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
      },
      spotifyTrack: { type: String, default: "" }, // Favorite track or embed link
      isPublic: { type: Boolean, default: true },
      isActive: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
