const orderRepository = require("../repositories/orderRepository");
const productRepository = require("../repositories/productRepository");
const userRepository = require("../repositories/userRepository");
const { generateOrderId } = require("../utils/generateOrderId");
const { sendEmail } = require("../utils/email");
const {
  orderConfirmationTemplate,
  adminOrderAlertTemplate,
} = require("../utils/emailTemplates");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const createOrder = async (userId, { items, notes }) => {
  if (!items || !items.length) {
    throw new ApiError(400, "Order must have at least one item");
  }

  const user = await userRepository.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Validate products and build snapshot
  const productIds = items.map((i) => i.productId);
  const products = await productRepository.findByIds(productIds);
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  const orderItems = [];
  let totalAmount = 0;

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new ApiError(400, `Product ${item.productId} not found`);
    }
    if (!product.isActive) {
      throw new ApiError(400, `Product "${product.name}" is not available`);
    }
    if (item.quantity < product.minOrderQty) {
      throw new ApiError(
        400,
        `Minimum order quantity for "${product.name}" is ${product.minOrderQty}`,
      );
    }
    if (item.quantity > product.stock) {
      throw new ApiError(
        400,
        `Insufficient stock for "${product.name}". Available: ${product.stock}`,
      );
    }

    const effectivePrice = product.discountPrice || product.price;
    orderItems.push({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: effectivePrice,
      discountPrice: product.discountPrice,
      quantity: item.quantity,
      unit: product.unit,
    });
    totalAmount += effectivePrice * item.quantity;
  }

  const order = await orderRepository.create({
    orderId: generateOrderId(),
    userId,
    userSnapshot: {
      email: user.email,
      businessName: user.businessName,
      contactPerson: user.contactPerson,
      phone: user.phone,
      gstNumber: user.gstNumber,
      billingAddress: user.billingAddress,
      shippingAddress: user.shippingAddress,
    },
    items: orderItems,
    totalAmount,
    status: "pending",
    notes,
  });

  // Send emails (non-blocking)
  sendEmail(
    user.email,
    `Order Confirmed - ${order.orderId}`,
    orderConfirmationTemplate(order),
  ).catch((err) =>
    console.error("Order confirmation email failed:", err.message),
  );

  sendEmail(
    env.ADMIN_EMAIL,
    `New Order - ${order.orderId}`,
    adminOrderAlertTemplate(order),
  ).catch((err) =>
    console.error("Admin order alert email failed:", err.message),
  );

  return order;
};

const getOrder = async (orderId) => {
  const order = await orderRepository.findByOrderId(orderId);
  if (!order) throw new ApiError(404, "Order not found");
  return order;
};

const getUserOrders = async (userId, query) => {
  return orderRepository.findByUserId(userId, {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 20,
  });
};

const listAllOrders = async (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  return orderRepository.findAll({
    filter,
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 20,
  });
};

const updateOrderStatus = async (id, status) => {
  const validStatuses = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  if (!validStatuses.includes(status)) {
    throw new ApiError(
      400,
      `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
    );
  }
  const order = await orderRepository.updateStatus(id, status);
  if (!order) throw new ApiError(404, "Order not found");
  return order;
};

module.exports = {
  createOrder,
  getOrder,
  getUserOrders,
  listAllOrders,
  updateOrderStatus,
};
