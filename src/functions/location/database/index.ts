import { ENUM_LOCATION_TYPE } from "../constants";
import { CreateLocation } from "../interfaces";
import { Location, LocationModelType } from "../models/create-location";

export class LocationDataBase {
    private model: LocationModelType;

    constructor(model: LocationModelType) {
        this.model = model;
    }

    async newLocation(params: CreateLocation): Promise<void> {
        try {
            const location: Location = { ...params, location: { ...params.location, type: ENUM_LOCATION_TYPE.POINT } };
            await this.model.create(location);
        } catch (error) {
            throw new Error("newLocation - dataBase error");
        }
    }
}