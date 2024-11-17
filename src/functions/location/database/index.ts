import { LocationModelType } from "../models/create-location";

export class LocationDataBase {
    private model: LocationModelType;

    constructor(model: LocationModelType) {
        this.model = model;
    }
}