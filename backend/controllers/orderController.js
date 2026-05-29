const orderService = require("../services/orderService");

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user.userId, req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user.userId, req.query);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, getOrder, getMyOrders };
