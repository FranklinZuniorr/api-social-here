import { CreateLocation, UpdateLocation } from "../interfaces";

export class LocationEntityValidation {
    private entity: CreateLocation;

    constructor(params: CreateLocation) {
        this.entity = this.validate(params);
    }

    private validate(params: CreateLocation): CreateLocation {

        if (!params.userName) {
            throw new Error("Username is required!");
        }

        if (params.userName.length <= 10) {
            throw new Error('The username length should be greater than of 10 characters.');
        }

        if(!params.location) {
            throw new Error('Location is required!');
        }

        if(!params.location.coordinates) {
            throw new Error('Coordinates is required!');
        }

        if(!Array.isArray(params.location.coordinates)) {
            throw new Error('Coordinates should be one array!');
        }

        if(params.location.coordinates.length < 2) {
            throw new Error('Lat and long are required!');
        }

        const capitalizedUserName = params.userName.charAt(0).toUpperCase() + params.userName.slice(1);

        params.userName = capitalizedUserName;

        return params;
    }

    get(): CreateLocation {
        return this.entity
    }
}