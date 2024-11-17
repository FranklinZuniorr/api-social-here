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
const constants_1 = require("../constants");
class LocationDataBase {
    constructor(model) {
        this.model = model;
    }
    newLocation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const location = Object.assign(Object.assign({}, params), { location: Object.assign(Object.assign({}, params.location), { type: constants_1.ENUM_LOCATION_TYPE.POINT }) });
                yield this.model.create(location);
            }
            catch (error) {
                throw new Error("newLocation - dataBase error");
            }
        });
    }
}
exports.LocationDataBase = LocationDataBase;
