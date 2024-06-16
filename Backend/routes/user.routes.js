const router = require("express").Router();
const { register, login, authenticateUser, getAllUsers } = require("../controllers/user.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/register", register);
router.post("/login", login);
router.get("/authenticate", Auth, checkRole(["User", "Admin"]), authenticateUser);
router.get("/", Auth, checkRole(["Admin"]), getAllUsers);

module.exports = router;
