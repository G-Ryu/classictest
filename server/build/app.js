"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var config_1 = __importDefault(require("./config"));
var route_1 = require("./route");
var verification_1 = __importDefault(require("./utils/verification"));
var app = express_1.default();
var port = 4000;
typeorm_1.createConnection(config_1.default)
    .then(function () {
    console.log("DB connected");
})
    .catch(function (error) { return console.log(error); });
app.use(morgan_1.default("dev"));
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default({
    origin: "https://localhost:3000",
    credentials: true,
}));
app.use(verification_1.default);
app.use("/user", route_1.userRouter);
app.use("/music", route_1.musicRouter);
app.get("/", function (req, res) {
    res.send("hello world");
});
app.listen(port, function () {
    console.log("Example app listening at " + port);
});
//# sourceMappingURL=app.js.map