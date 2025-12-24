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
      backgroundImage: { type: String, default: "" },

      socialLinks: {
        youtube: {
          url: { type: String, default: "" },
          visible: { type: Boolean, default: true },
        },
        instagram: {
          url: { type: String, default: "" },
          visible: { type: Boolean, default: true },
        },
        facebook: {
          url: { type: String, default: "" },
          visible: { type: Boolean, default: true },
        },
        gmail: {
          url: { type: String, default: "" },
          visible: { type: Boolean, default: true },
        },
        linkedin: {
          url: { type: String, default: "" },
          visible: { type: Boolean, default: true },
        },
        github: {
          url: { type: String, default: "" },
          visible: { type: Boolean, default: true },
        },
      },
      spotifyTrack: { type: String, default: "" }, // Favorite track or embed link
      isPublic: { type: Boolean, default: true },
      isActive: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("User", UserSchema);
