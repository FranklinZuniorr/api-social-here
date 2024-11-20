import { GetByCoordinates } from "../interfaces";

export class Validators {
    validateGetByCoordinates(params: GetByCoordinates): GetByCoordinates {
        if(!params.lat) {
            throw new Error("Lat is required!");
        }

        if(!params.long) {
            throw new Error("Long is required!");
        }

        if(!params.radiusInKm) {
            throw new Error('RadiusInKm is required!');
        }

        if(params.radiusInKm <= 0) {
            throw new Error('RadiusInKm should be greater than that 0')
        }

        return params;
    }
}