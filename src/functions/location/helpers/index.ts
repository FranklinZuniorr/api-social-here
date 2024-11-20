import { GetByCoordinates, UpdateLocation } from "../interfaces";

export class Validators {
    validateUpdate(params: UpdateLocation): UpdateLocation {
        if(!params.locationId) {
            throw new Error("LocationId is required!");
        }

        if(!params.coordinates) {
            throw new Error("Coordinates is required!");
        }

        if(!Array.isArray(params.coordinates)) {
            throw new Error('Coordinates should be one array!');
        }

        if(params.coordinates.length < 2) {
            throw new Error('Lat and long are required!');
        }

        return params;
    }

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