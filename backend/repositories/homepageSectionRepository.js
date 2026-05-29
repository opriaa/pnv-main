const HomepageSection = require("../models/HomepageSection");

const findAllActive = () =>
  HomepageSection.find({ isActive: true }).sort({ order: 1 }).lean();

const findAll = () => HomepageSection.find().sort({ order: 1 }).lean();

const findById = (id) => HomepageSection.findById(id);

const findBySlug = (slug) => HomepageSection.findOne({ slug }).lean();

const create = (data) => HomepageSection.create(data);

const updateById = (id, data) =>
  HomepageSection.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

const deleteById = (id) => HomepageSection.findByIdAndDelete(id);

module.exports = {
  findAllActive,
  findAll,
  findById,
  findBySlug,
  create,
  updateById,
  deleteById,
};
