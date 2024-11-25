import { Types } from "mongoose";
import { MessageResponse } from "../../../interfaces";
import { Location } from "../models/create-location";
import { ENUM_LOCATION_TYPE } from "../../../constants";

export interface CreateLocation {
    userName: string;
    location: {
        coordinates: [number, number];
    };
};

export interface UpdateLocation {
    locationId: Types.ObjectId;
    coordinates: [number, number];
}

export interface GetByCoordinates {
    lat: number;
    long: number;
    radiusInKm: number;
}

export interface NewLocationResponse extends MessageResponse {
    locationId: string;
}

export interface NewLocationDataBaseResponse {
    _id: Types.ObjectId;
    userName: string;
    location: {
        type: ENUM_LOCATION_TYPE.POINT;
        coordinates: [number, number];
    };
}

export interface GetByCoordinatesResponse {
    locations: Location[];
}