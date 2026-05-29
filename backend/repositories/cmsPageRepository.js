const CmsPage = require("../models/CmsPage");

const findBySlug = (slug) =>
  CmsPage.findOne({ slug, isPublished: true }).lean();

const findAll = () => CmsPage.find().sort({ createdAt: -1 }).lean();

const findById = (id) => CmsPage.findById(id);

const create = (data) => CmsPage.create(data);

const updateById = (id, data) =>
  CmsPage.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteById = (id) => CmsPage.findByIdAndDelete(id);

module.exports = {
  findBySlug,
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
