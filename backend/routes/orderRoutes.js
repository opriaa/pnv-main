const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middlewares/auth");
const { validate, createOrderSchema } = require("../middlewares/validate");

router.post(
  "/",
  auth,
  validate(createOrderSchema),
  orderController.createOrder,
);
router.get("/my", auth, orderController.getMyOrders);
router.get("/:id", auth, orderController.getOrder);

module.exports = router;
