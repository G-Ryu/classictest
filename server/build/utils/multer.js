"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
Promise.resolve().then(function () { return __importStar(require("dotenv/config")); });
var s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.S3ID,
    secretAccessKey: process.env.S3KEY,
    region: "ap-northeast-2",
});
var upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: process.env.S3NAME,
        acl: "public-read",
        key: function (req, file, cb) {
            cb(null, Date.now() + "." + file.originalname);
        },
    }),
});
module.exports = upload;
//# sourceMappingURL=multer.js.map