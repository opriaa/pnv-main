const productRepository = require("../repositories/productRepository");
const ApiError = require("../utils/ApiError");
const { slugify } = require("../utils/slugify");

const listProducts = async (query) => {
  const {
    page = 1,
    limit = 20,
    sort: sortParam,
    category,
    search,
    minPrice,
    maxPrice,
  } = query;

  const filter = { isActive: true };

  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  let sort = { createdAt: -1 };
  if (sortParam === "price_asc") sort = { price: 1 };
  else if (sortParam === "price_desc") sort = { price: -1 };
  else if (sortParam === "name_asc") sort = { name: 1 };
  else if (sortParam === "name_desc") sort = { name: -1 };

  return productRepository.findAll({
    filter,
    sort,
    page: Number(page),
    limit: Number(limit),
  });
};

const getProductBySlug = async (slug) => {
  const product = await productRepository.findBySlug(slug);
  if (!product) throw new ApiError(404, "Product not found");
  return product;
};

const createProduct = async (data) => {
  if (!data.slug) data.slug = slugify(data.name);
  return productRepository.create(data);
};

const updateProduct = async (id, data) => {
  if (data.name && !data.slug) data.slug = slugify(data.name);
  const product = await productRepository.updateById(id, data);
  if (!product) throw new ApiError(404, "Product not found");
  return product;
};

const deleteProduct = async (id) => {
  const product = await productRepository.deleteById(id);
  if (!product) throw new ApiError(404, "Product not found");
  return product;
};

const getCategories = async () => {
  return productRepository.getDistinctCategories();
};

module.exports = {
  listProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
