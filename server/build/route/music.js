"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var controller_1 = require("../controller");
var router = express_1.default.Router();
var multer_1 = __importDefault(require("../utils/multer"));
router.post("/create", multer_1.default.fields([
    { name: "filePath", maxCount: 1 },
    { name: "poster", maxCount: 1 },
]), controller_1.musicController.create);
router.get("/read", controller_1.musicController.read);
router.patch("/update", multer_1.default.fields([
    { name: "filePath", maxCount: 1 },
    { name: "poster", maxCount: 1 },
]), controller_1.musicController.update);
router.delete("/delete", controller_1.musicController.delete);
module.exports = router;
//# sourceMappingURL=music.js.map