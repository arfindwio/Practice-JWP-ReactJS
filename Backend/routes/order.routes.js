const router = require("express").Router();
const { getAllOrders, createOrder, editOrderById, getOrdersHistory } = require("../controllers/order.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", Auth, checkRole(["Admin"]), getAllOrders);
router.post("/", Auth, checkRole(["User", "Admin"]), createOrder);
router.put("/:orderId", Auth, checkRole(["Admin"]), editOrderById);
router.get("/history", Auth, checkRole(["User", "Admin"]), getOrdersHistory);

module.exports = router;
