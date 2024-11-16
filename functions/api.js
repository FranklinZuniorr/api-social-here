"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helpers_1 = require("../helpers");
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const router = express_1.default.Router();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public'), {
    maxAge: 0
}));
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
const port = 3000;
router.get('/resume-page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urlToPrint, apiKey } = req.query;
    if (!urlToPrint) {
        res.send('Cadê a url?').status(400);
        return;
    }
    let url;
    try {
        url = yield (0, helpers_1.printUrlPage)(urlToPrint);
    }
    catch (error) {
        res.send({ resume: 'Erro ao visualizar site!' }).status(500);
    }
    const body = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Faz um resumo do site presente na imagem!"
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url,
                        }
                    }
                ]
            }
        ],
        max_tokens: 10000
    };
    const accessToken = `Bearer ${apiKey}`;
    try {
        const response = (yield axios_1.default.post('https://api.openai.com/v1/chat/completions', body, { headers: { Authorization: accessToken } })).data;
        res.send({ resume: response.choices[0].message.content });
    }
    catch (error) {
        res.send('Erro ao resumir.');
    }
}));
app.use('/api/', router);
app.listen(port);
module.exports.handler = (0, serverless_http_1.default)(app);
