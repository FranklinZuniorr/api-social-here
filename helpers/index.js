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
exports.printUrlPage = void 0;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chromium_1 = __importDefault(require("@sparticuz/chromium"));
const printUrlPage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_core_1.default.launch({
        args: [...chromium_1.default.args, '--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: chromium_1.default.defaultViewport,
        executablePath: yield chromium_1.default.executablePath(),
        headless: false,
    });
    const page = yield browser.newPage();
    yield page.goto(url);
    const url64 = `data:image/png;base64,${yield page.screenshot({
        type: 'webp',
        encoding: 'base64',
        fullPage: false,
        quality: 20,
        optimizeForSpeed: true,
        captureBeyondViewport: true
    })}`;
    yield browser.close();
    return url64;
});
exports.printUrlPage = printUrlPage;
