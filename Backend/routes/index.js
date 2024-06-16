const router = require("express").Router();

const User = require("./user.routes");
const UserProfile = require("./userProfile.routes");
const Service = require("./service.routes");
const Order = require("./order.routes");

// API
router.use("/api/v1/users", User);
router.use("/api/v1/user-profiles", UserProfile);
router.use("/api/v1/services", Service);
router.use("/api/v1/orders", Order);

module.exports = router;
