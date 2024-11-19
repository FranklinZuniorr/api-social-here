"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const express_1 = require("express");
const database_1 = require("./database");
const create_location_1 = __importDefault(require("./models/create-location"));
const service_1 = require("./service");
exports.locationRouter = (0, express_1.Router)();
const dataBase = new database_1.LocationDataBase(create_location_1.default);
const service = new service_1.LocationService(dataBase);
exports.locationRouter.get('', (req, res) => {
    res.send("Working!");
});
exports.locationRouter.post('/new-location', (req, res) => service.new(req, res));
exports.locationRouter.put('/location', (req, res) => service.update(req, res));
exports.locationRouter.get('/locations-by-coordinates', (req, res) => service.getByCoordinates(req, res));
