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
exports.LocationDataBase = void 0;
const constants_1 = require("../../../constants");
class LocationDataBase {
    constructor(model) {
        this.model = model;
    }
    newLocation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = Object.assign(Object.assign({}, params), { location: Object.assign(Object.assign({}, params.location), { type: constants_1.ENUM_LOCATION_TYPE.POINT }) });
                return (yield this.model.create(location)).toObject();
            }
            catch (error) {
                throw new Error("newLocation - dataBase error");
            }
        });
    }
    updateLocation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationUpdate = {
                    location: {
                        type: constants_1.ENUM_LOCATION_TYPE.POINT,
                        coordinates: params.coordinates
                    }
                };
                try {
                    yield this.model.findOneAndUpdate({ _id: params.locationId }, locationUpdate);
                }
                catch (error) {
                    throw new Error("LocationId not found!");
                }
            }
            catch (error) {
                throw new Error(`updateLocation - dataBase error - ${error.message}`);
            }
        });
    }
    getByUserName(search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = yield this.model.findOne({ userName: search });
                if (location) {
                    return location.toObject();
                }
                throw new Error("UserName not found!");
            }
            catch (error) {
                throw new Error(`getByUserName - dataBase error - ${error.message}`);
            }
        });
    }
    getByCoordinates(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const earthRadiusInKm = 6378.1;
                const radiusInRadians = params.radiusInKm / earthRadiusInKm;
                try {
                    const locations = (yield this.model.find({
                        location: {
                            $geoWithin: {
                                $centerSphere: [params.coordinates, radiusInRadians],
                            },
                        },
                    })).map(location => location.toObject());
                    return locations;
                }
                catch (error) {
                    throw new Error(error.message);
                }
            }
            catch (error) {
                throw new Error(`getByCoordinates - dataBase error - ${error.message}`);
            }
        });
    }
}
exports.LocationDataBase = LocationDataBase;
