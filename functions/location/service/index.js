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
exports.LocationService = void 0;
const entity_1 = require("../entity");
const helpers_1 = require("../helpers");
class LocationService {
    constructor(dataBase2) {
        this.dataBase = dataBase2;
    }
    new(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const location = new entity_1.LocationEntityValidation(body).get();
                try {
                    const existLocationUserName = yield this.dataBase.getByUserName(location.userName);
                    if (existLocationUserName) {
                        res.status(400).send({ message: 'UserName already in use!' });
                    }
                }
                catch (error) {
                    const newLocation = yield this.dataBase.newLocation(location);
                    res.status(201).send({ message: 'Location successfully created!', locationId: newLocation._id.toHexString() });
                }
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const locationUpdate = new helpers_1.Validators().validateUpdate(body);
                yield this.dataBase.updateLocation(locationUpdate);
                res.status(200).send({ message: 'Location successfully updated!' });
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
                const locations = yield this.dataBase.getByCoordinates(query);
                res.status(200).send({ locations });
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        });
    }
}
exports.LocationService = LocationService;
