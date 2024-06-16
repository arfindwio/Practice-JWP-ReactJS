const router = require("express").Router();
const { updateProfile } = require("../controllers/userProfile.controllers");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.put("/update-profile", Auth, checkRole(["User", "Admin"]), updateProfile);

module.exports = router;
