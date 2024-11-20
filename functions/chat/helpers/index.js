"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    validateGetByCoordinates(params) {
        if (!params.lat) {
            throw new Error("Lat is required!");
        }
        if (!params.long) {
            throw new Error("Long is required!");
        }
        if (!params.radiusInKm) {
            throw new Error('RadiusInKm is required!');
        }
        if (params.radiusInKm <= 0) {
            throw new Error('RadiusInKm should be greater than that 0');
        }
        return params;
    }
}
exports.Validators = Validators;
