const profileService = require("../services/profileService");

const getProfile = async (req, res, next) => {
  try {
    const user = await profileService.getProfile(req.user.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await profileService.updateProfile(req.user.userId, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };
