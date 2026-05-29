const productService = require("../services/productService");
const orderService = require("../services/orderService");
const cmsService = require("../services/cmsService");
const homepageSectionService = require("../services/homepageSectionService");
const pincodeService = require("../services/pincodeService");
const bankDetailsService = require("../services/bankDetailsService");
const { imagekit } = require("../utils/imagekit");
const { toFile } = require("@imagekit/nodejs");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

// Admin login (simple token-based)
const login = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token || token !== env.ADMIN_TOKEN) {
      throw new ApiError(401, "Invalid admin token");
    }
    res.json({ message: "Admin authenticated", token: env.ADMIN_TOKEN });
  } catch (err) {
    next(err);
  }
};

// Products
const listProducts = async (req, res, next) => {
  try {
    const result = await productService.listProducts({
      ...req.query,
      isAdmin: true,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

// Orders
const listOrders = async (req, res, next) => {
  try {
    const result = await orderService.listAllOrders(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
    );
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// CMS Pages
const listCmsPages = async (req, res, next) => {
  try {
    const pages = await cmsService.getAllPages();
    res.json(pages);
  } catch (err) {
    next(err);
  }
};

const createCmsPage = async (req, res, next) => {
  try {
    const page = await cmsService.createPage(req.body);
    res.status(201).json(page);
  } catch (err) {
    next(err);
  }
};

const updateCmsPage = async (req, res, next) => {
  try {
    const page = await cmsService.updatePage(req.params.id, req.body);
    res.json(page);
  } catch (err) {
    next(err);
  }
};

const deleteCmsPage = async (req, res, next) => {
  try {
    await cmsService.deletePage(req.params.id);
    res.json({ message: "Page deleted" });
  } catch (err) {
    next(err);
  }
};

// Homepage Sections
const listHomepageSections = async (req, res, next) => {
  try {
    const sections = await homepageSectionService.getAllSections();
    res.json(sections);
  } catch (err) {
    next(err);
  }
};

const createHomepageSection = async (req, res, next) => {
  try {
    const section = await homepageSectionService.createSection(req.body);
    res.status(201).json(section);
  } catch (err) {
    next(err);
  }
};

const updateHomepageSection = async (req, res, next) => {
  try {
    const section = await homepageSectionService.updateSection(
      req.params.id,
      req.body,
    );
    res.json(section);
  } catch (err) {
    next(err);
  }
};

const deleteHomepageSection = async (req, res, next) => {
  try {
    await homepageSectionService.deleteSection(req.params.id);
    res.json({ message: "Section deleted" });
  } catch (err) {
    next(err);
  }
};

// Bank Details
const getBankDetails = async (req, res, next) => {
  try {
    const details = await bankDetailsService.getBankDetails();
    res.json(details || {});
  } catch (err) {
    next(err);
  }
};

const upsertBankDetails = async (req, res, next) => {
  try {
    const details = await bankDetailsService.upsertBankDetails(req.body);
    res.json(details);
  } catch (err) {
    next(err);
  }
};

// Pincodes
const listPincodes = async (req, res, next) => {
  try {
    const result = await pincodeService.listAll(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createPincode = async (req, res, next) => {
  try {
    const pincode = await pincodeService.createPincode(req.body);
    res.status(201).json(pincode);
  } catch (err) {
    next(err);
  }
};

const updatePincode = async (req, res, next) => {
  try {
    const pincode = await pincodeService.updatePincode(req.params.id, req.body);
    res.json(pincode);
  } catch (err) {
    next(err);
  }
};

const deletePincode = async (req, res, next) => {
  try {
    await pincodeService.deletePincode(req.params.id);
    res.json({ message: "Pincode deleted" });
  } catch (err) {
    next(err);
  }
};

// Image upload
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, "No file uploaded");
    const file = await toFile(req.file.buffer, req.file.originalname, {
      type: req.file.mimetype,
    });
    const result = await imagekit.files.upload({
      file,
      fileName: req.file.originalname,
      folder: "/products",
    });
    res.json({ url: result.url, fileId: result.fileId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  listOrders,
  updateOrderStatus,
  listCmsPages,
  createCmsPage,
  updateCmsPage,
  deleteCmsPage,
  listHomepageSections,
  createHomepageSection,
  updateHomepageSection,
  deleteHomepageSection,
  getBankDetails,
  upsertBankDetails,
  listPincodes,
  createPincode,
  updatePincode,
  deletePincode,
  uploadImage,
};
