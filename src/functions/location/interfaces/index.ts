import { Types } from "mongoose";
import { MessageResponse } from "../../../interfaces";
import { ENUM_LOCATION_TYPE } from "../constants";
import { Location } from "../models/create-location";

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
    coordinates: [number, number];
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