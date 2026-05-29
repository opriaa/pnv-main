const Product = require("../models/Product");

const findAll = async ({ filter = {}, sort = {}, page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);
  return { products, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const findBySlug = (slug) => Product.findOne({ slug }).lean();

const findById = (id) => Product.findById(id);

const create = (data) => Product.create(data);

const updateById = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteById = (id) => Product.findByIdAndDelete(id);

const findByIds = (ids) => Product.find({ _id: { $in: ids } }).lean();

const getDistinctCategories = () =>
  Product.distinct("category", { isActive: true, category: { $nin: [null, ""] } });

module.exports = {
  findAll,
  findBySlug,
  findById,
  create,
  updateById,
  deleteById,
  findByIds,
  getDistinctCategories,
};
