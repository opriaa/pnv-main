const Joi = require("joi");
const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new ApiError(400, message));
  }
  req.body = value;
  next();
};

// Schemas
const sendOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).pattern(/^\d+$/).required(),
});

const profileSchema = Joi.object({
  businessName: Joi.string().max(200),
  gstNumber: Joi.string().max(20),
  contactPerson: Joi.string().max(100),
  phone: Joi.string().max(15),
  billingAddress: Joi.object({
    line1: Joi.string().max(200),
    line2: Joi.string().max(200).allow(""),
    city: Joi.string().max(100),
    state: Joi.string().max(100),
    pincode: Joi.string().max(10),
  }),
  shippingAddress: Joi.object({
    line1: Joi.string().max(200),
    line2: Joi.string().max(200).allow(""),
    city: Joi.string().max(100),
    state: Joi.string().max(100),
    pincode: Joi.string().max(10),
  }),
});

const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),
  notes: Joi.string().max(500).allow(""),
});

const productSchema = Joi.object({
  name: Joi.string().max(200).required(),
  slug: Joi.string().max(200),
  description: Joi.string().max(5000).allow(""),
  images: Joi.array().items(Joi.string().uri()).max(5),
  price: Joi.number().min(0).required(),
  discountPrice: Joi.number().min(0),
  unit: Joi.string().max(50),
  minOrderQty: Joi.number().integer().min(1),
  stock: Joi.number().integer().min(0),
  sku: Joi.string().max(50),
  category: Joi.string().max(100),
  isActive: Joi.boolean(),
});

const productUpdateSchema = Joi.object({
  name: Joi.string().max(200),
  slug: Joi.string().max(200),
  description: Joi.string().max(5000).allow(""),
  images: Joi.array().items(Joi.string().uri()).max(5),
  price: Joi.number().min(0),
  discountPrice: Joi.number().min(0),
  unit: Joi.string().max(50),
  minOrderQty: Joi.number().integer().min(1),
  stock: Joi.number().integer().min(0),
  sku: Joi.string().max(50),
  category: Joi.string().max(100),
  isActive: Joi.boolean(),
});

const cmsPageSchema = Joi.object({
  title: Joi.string().max(200).required(),
  slug: Joi.string().max(200),
  content: Joi.string().max(50000).allow(""),
  metaTitle: Joi.string().max(200),
  metaDescription: Joi.string().max(500),
  isPublished: Joi.boolean(),
});

const cmsPageUpdateSchema = Joi.object({
  title: Joi.string().max(200),
  slug: Joi.string().max(200),
  content: Joi.string().max(50000).allow(""),
  metaTitle: Joi.string().max(200),
  metaDescription: Joi.string().max(500),
  isPublished: Joi.boolean(),
});

const homepageSectionSchema = Joi.object({
  title: Joi.string().max(200).required(),
  slug: Joi.string().max(200),
  type: Joi.string().valid(
    "banner",
    "featured",
    "categories",
    "text",
    "cta",
    "custom",
  ),
  content: Joi.object(),
  order: Joi.number().integer(),
  isActive: Joi.boolean(),
});

const homepageSectionUpdateSchema = Joi.object({
  title: Joi.string().max(200),
  slug: Joi.string().max(200),
  type: Joi.string().valid(
    "banner",
    "featured",
    "categories",
    "text",
    "cta",
    "custom",
  ),
  content: Joi.object(),
  order: Joi.number().integer(),
  isActive: Joi.boolean(),
});

const bankDetailsSchema = Joi.object({
  bankName: Joi.string().max(100).required(),
  accountName: Joi.string().max(100).required(),
  accountNumber: Joi.string().max(30).required(),
  ifscCode: Joi.string().max(20).required(),
  branch: Joi.string().max(100),
  upiId: Joi.string().max(50),
  notes: Joi.string().max(500),
});

const pincodeSchema = Joi.object({
  pincode: Joi.string().length(6).pattern(/^\d+$/).required(),
  state: Joi.string().max(100).required(),
  city: Joi.string().max(100),
  deliveryAvailable: Joi.boolean(),
  deliveryDays: Joi.number().integer().min(0),
});

const pincodeUpdateSchema = Joi.object({
  pincode: Joi.string().length(6).pattern(/^\d+$/),
  state: Joi.string().max(100),
  city: Joi.string().max(100),
  deliveryAvailable: Joi.boolean(),
  deliveryDays: Joi.number().integer().min(0),
});

module.exports = {
  validate,
  sendOtpSchema,
  verifyOtpSchema,
  profileSchema,
  createOrderSchema,
  productSchema,
  productUpdateSchema,
  cmsPageSchema,
  cmsPageUpdateSchema,
  homepageSectionSchema,
  homepageSectionUpdateSchema,
  bankDetailsSchema,
  pincodeSchema,
  pincodeUpdateSchema,
};
