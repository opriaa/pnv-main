const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");
const bankDetailsService = require("../services/bankDetailsService");

router.get("/home", cmsController.getHomepage);
router.get("/page/:slug", cmsController.getPage);
router.get("/bank-details", async (req, res, next) => {
  try {
    const details = await bankDetailsService.getBankDetails();
    res.json(details || {});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
