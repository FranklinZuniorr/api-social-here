import { UpdateLocation } from "../interfaces";

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
}