const cmsPageRepository = require("../repositories/cmsPageRepository");
const ApiError = require("../utils/ApiError");
const { slugify } = require("../utils/slugify");

const getPageBySlug = async (slug) => {
  const page = await cmsPageRepository.findBySlug(slug);
  if (!page) throw new ApiError(404, "Page not found");
  return page;
};

const getAllPages = () => cmsPageRepository.findAll();

const createPage = async (data) => {
  if (!data.slug) data.slug = slugify(data.title);
  return cmsPageRepository.create(data);
};

const updatePage = async (id, data) => {
  if (data.title && !data.slug) data.slug = slugify(data.title);
  const page = await cmsPageRepository.updateById(id, data);
  if (!page) throw new ApiError(404, "Page not found");
  return page;
};

const deletePage = async (id) => {
  const page = await cmsPageRepository.deleteById(id);
  if (!page) throw new ApiError(404, "Page not found");
  return page;
};

module.exports = {
  getPageBySlug,
  getAllPages,
  createPage,
  updatePage,
  deletePage,
};
