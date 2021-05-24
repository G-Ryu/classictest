"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var controller_1 = require("../controller");
var router = express_1.default.Router();
var multer_1 = __importDefault(require("../utils/multer"));
router.post("/signup", multer_1.default.single("profileImage"), controller_1.userController.signup);
router.post("/signout", controller_1.userController.signout);
router.post("/login", controller_1.userController.login);
router.get("/logout", controller_1.userController.logout);
router.get("/exist", controller_1.userController.exist);
router.get("/info", controller_1.userController.info);
router.post("/update", multer_1.default.single("profileImage"), controller_1.userController.update);
module.exports = router;
//# sourceMappingURL=user.js.map