const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const auth = require("../middlewares/auth");
const { validate, profileSchema } = require("../middlewares/validate");

router.get("/", auth, profileController.getProfile);
router.post(
  "/",
  auth,
  validate(profileSchema),
  profileController.updateProfile,
);

module.exports = router;
