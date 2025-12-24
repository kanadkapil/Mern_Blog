const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const { bio, profilePicture, socialLinks, spotifyTrack, isPublic } =
      req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (bio !== undefined) user.profile.bio = bio;
    if (profilePicture !== undefined)
      user.profile.profilePicture = profilePicture;
    if (socialLinks)
      user.profile.socialLinks = {
        ...user.profile.socialLinks,
        ...socialLinks,
      };
    if (spotifyTrack !== undefined) user.profile.spotifyTrack = spotifyTrack;
    if (isPublic !== undefined) user.profile.isPublic = isPublic;

    await user.save();
    res.json(user.profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profile.isActive = false;
    await user.save();

    res.clearCookie("token");
    res.json({ message: "Account deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");

    if (!user || !user.profile.isActive) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      !user.profile.isPublic &&
      (!req.user || req.user.id !== user.id.toString())
    ) {
      return res.status(403).json({ message: "This profile is private" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProfile, deactivateAccount, getPublicProfile };
