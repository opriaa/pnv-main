const cmsService = require("../services/cmsService");
const homepageSectionService = require("../services/homepageSectionService");

const getPage = async (req, res, next) => {
  try {
    const page = await cmsService.getPageBySlug(req.params.slug);
    res.json(page);
  } catch (err) {
    next(err);
  }
};

const getHomepage = async (req, res, next) => {
  try {
    const sections = await homepageSectionService.getHomepage();
    res.json(sections);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPage, getHomepage };
