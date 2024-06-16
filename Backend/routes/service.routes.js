const router = require("express").Router();
const { getAllServices, createService, editServiceById, deleteServiceById } = require("../controllers/service.controllers");
const { image } = require("../libs/multer");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", getAllServices);
router.post("/", Auth, checkRole(["Admin"]), image.single("image"), createService);
router.put("/:serviceId", Auth, checkRole(["Admin"]), image.single("image"), editServiceById);
router.delete("/:serviceId", Auth, checkRole(["Admin"]), deleteServiceById);

module.exports = router;
