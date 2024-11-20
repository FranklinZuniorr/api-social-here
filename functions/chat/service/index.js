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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServie = void 0;
const entity_1 = require("../entity");
const helpers_1 = require("../helpers");
class ChatServie {
    constructor(dataBase) {
        this.dataBase = dataBase;
    }
    new(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const chat = new entity_1.ChatEntityValidation(body).get();
                yield this.dataBase.new(chat);
                res.status(201).send({ message: "New chat created with success!" });
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        });
    }
    getByCoordinates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { coordinates, radiusInKm } = req.query;
            try {
                const query = new helpers_1.Validators().validateGetByCoordinates({ coordinates, radiusInKm });
                const chats = yield this.dataBase.getByCoordinates(query);
                res.status(200).send({ chats });
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        });
    }
}
exports.ChatServie = ChatServie;
