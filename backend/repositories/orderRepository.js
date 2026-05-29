const Order = require("../models/Order");

const create = (data) => Order.create(data);

const findById = (id) => Order.findById(id);

const findByOrderId = (orderId) => Order.findOne({ orderId }).lean();

const findByUserId = (userId, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  return Order.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

const findAll = async ({ filter = {}, page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(filter),
  ]);
  return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const updateStatus = (id, status) =>
  Order.findByIdAndUpdate(id, { status }, { new: true });

module.exports = {
  create,
  findById,
  findByOrderId,
  findByUserId,
  findAll,
  updateStatus,
};
