const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");
const {
  validate,
  productSchema,
  productUpdateSchema,
  cmsPageSchema,
  cmsPageUpdateSchema,
  homepageSectionSchema,
  homepageSectionUpdateSchema,
  bankDetailsSchema,
  pincodeSchema,
  pincodeUpdateSchema,
} = require("../middlewares/validate");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

// Admin login
router.post("/login", adminController.login);

// Image upload
router.post(
  "/upload-image",
  adminAuth,
  upload.single("image"),
  adminController.uploadImage,
);

// Products
router.get("/products", adminAuth, adminController.listProducts);
router.post(
  "/products",
  adminAuth,
  validate(productSchema),
  adminController.createProduct,
);
router.put(
  "/products/:id",
  adminAuth,
  validate(productUpdateSchema),
  adminController.updateProduct,
);
router.delete("/products/:id", adminAuth, adminController.deleteProduct);

// Orders
router.get("/orders", adminAuth, adminController.listOrders);
router.patch(
  "/orders/:id/status",
  adminAuth,
  adminController.updateOrderStatus,
);

// CMS Pages
router.get("/cms-pages", adminAuth, adminController.listCmsPages);
router.post(
  "/cms-pages",
  adminAuth,
  validate(cmsPageSchema),
  adminController.createCmsPage,
);
router.put(
  "/cms-pages/:id",
  adminAuth,
  validate(cmsPageUpdateSchema),
  adminController.updateCmsPage,
);
router.delete("/cms-pages/:id", adminAuth, adminController.deleteCmsPage);

// Homepage Sections
router.get(
  "/homepage-sections",
  adminAuth,
  adminController.listHomepageSections,
);
router.post(
  "/homepage-sections",
  adminAuth,
  validate(homepageSectionSchema),
  adminController.createHomepageSection,
);
router.put(
  "/homepage-sections/:id",
  adminAuth,
  validate(homepageSectionUpdateSchema),
  adminController.updateHomepageSection,
);
router.delete(
  "/homepage-sections/:id",
  adminAuth,
  adminController.deleteHomepageSection,
);

// Bank Details
router.get("/bank-details", adminAuth, adminController.getBankDetails);
router.put(
  "/bank-details",
  adminAuth,
  validate(bankDetailsSchema),
  adminController.upsertBankDetails,
);

// Pincodes
router.get("/pincodes", adminAuth, adminController.listPincodes);
router.post(
  "/pincodes",
  adminAuth,
  validate(pincodeSchema),
  adminController.createPincode,
);
router.put(
  "/pincodes/:id",
  adminAuth,
  validate(pincodeUpdateSchema),
  adminController.updatePincode,
);
router.delete("/pincodes/:id", adminAuth, adminController.deletePincode);

module.exports = router;
