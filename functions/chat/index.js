"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const database_1 = require("./database");
const chat_1 = __importDefault(require("./models/chat"));
const service_1 = require("./service");
exports.chatRouter = (0, express_1.Router)();
const dataBase = new database_1.ChatDataBase(chat_1.default);
const service = new service_1.ChatServie(dataBase);
exports.chatRouter.post('/new-chat', (req, res) => service.new(req, res));
exports.chatRouter.get('/chats-by-coordinates', (req, res) => service.getByCoordinates(req, res));
