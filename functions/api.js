"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const mongoose_1 = __importDefault(require("../infrastructure/mongoose"));
const location_1 = require("./location");
const chat_1 = require("./chat");
const router = express_1.default.Router();
dotenv_1.default.config();
(0, mongoose_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public'), {
    maxAge: 0
}));
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
const port = process.env.PORT || 3000;
router.use('/locations/', location_1.locationRouter);
router.use('/chats/', chat_1.chatRouter);
app.use('/api/', router);
app.listen(port);
module.exports.handler = (0, serverless_http_1.default)(app);
