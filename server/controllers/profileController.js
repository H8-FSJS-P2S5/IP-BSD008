//create for profile controller
const { Profile } = require("../models");
const { User } = require("../models");

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
      ],
    });
    res.status(200).json(profiles);
  } catch (err) {
    next(err);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.params.id, {
      include: [User],
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

const createProfile = async (req, res, next) => {
  try {
    const profileData = req.body; // Directly use req.body
    const profile = await Profile.create(profileData);
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedProfile = await profile.update(req.body); // Update profile with req.body
    res.status(200).json(updatedProfile);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  const { imageUrl } = req.body; // Assuming the image URL is sent in the request body

  try {
    const profile = await Profile.findOne({ where: { userId: userId } });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.profile_picture = imageUrl;
    await profile.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfiles, getProfileById, createProfile, updateProfile };
