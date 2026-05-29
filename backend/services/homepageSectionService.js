const homepageSectionRepository = require("../repositories/homepageSectionRepository");
const ApiError = require("../utils/ApiError");
const { slugify } = require("../utils/slugify");

const getHomepage = () => homepageSectionRepository.findAllActive();

const getAllSections = () => homepageSectionRepository.findAll();

const createSection = async (data) => {
  if (!data.slug) data.slug = slugify(data.title);
  return homepageSectionRepository.create(data);
};

const updateSection = async (id, data) => {
  const section = await homepageSectionRepository.updateById(id, data);
  if (!section) throw new ApiError(404, "Section not found");
  return section;
};

const deleteSection = async (id) => {
  const section = await homepageSectionRepository.deleteById(id);
  if (!section) throw new ApiError(404, "Section not found");
  return section;
};

module.exports = {
  getHomepage,
  getAllSections,
  createSection,
  updateSection,
  deleteSection,
};
