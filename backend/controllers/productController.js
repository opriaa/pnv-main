const productService = require("../services/productService");

const listProducts = async (req, res, next) => {
  try {
    const result = await productService.listProducts(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductBySlug(req.params.slug);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await productService.getCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = { listProducts, getProduct, getCategories };
