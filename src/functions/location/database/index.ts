import { ENUM_LOCATION_TYPE } from "../../../constants";
import { CreateLocation, GetByCoordinates, NewLocationDataBaseResponse, UpdateLocation } from "../interfaces";
import { Location, LocationModelType } from "../models/create-location";

export class LocationDataBase {
    private model: LocationModelType;

    constructor(model: LocationModelType) {
        this.model = model;
    }

    async newLocation(params: CreateLocation): Promise<NewLocationDataBaseResponse> {
        try {
            const location: Location = { ...params, location: { ...params.location, type: ENUM_LOCATION_TYPE.POINT } };
            return (await this.model.create(location)).toObject();
        } catch (error) {
            throw new Error("newLocation - dataBase error");
        }
    }

    async updateLocation(params: UpdateLocation) {
        try {
            const locationUpdate: Partial<Location> = {
                location: {
                    type: ENUM_LOCATION_TYPE.POINT,
                    coordinates: params.coordinates
                }
            };
            try {
                await this.model.findOneAndUpdate({ _id: params.locationId }, locationUpdate);
            } catch (error) {
                throw new Error("LocationId not found!");
            }
        } catch (error: any) {
            throw new Error(`updateLocation - dataBase error - ${error.message}`);
        }
    }

    async getByUserName(search: string): Promise<Location> {
        try {
            const location = await this.model.findOne({ userName: search });

            if (location) {
                return location.toObject();
            }

            throw new Error("UserName not found!");
        } catch (error: any) {
            throw new Error(`getByUserName - dataBase error - ${error.message}`);
        }
    }

    async getByCoordinates(params: GetByCoordinates): Promise<Location[]> {
        try {
            const earthRadiusInKm = 6378.1;
            const radiusInRadians = params.radiusInKm / earthRadiusInKm;

            try {
                const locations: Location[] = (await this.model.find({
                    location: {
                    $geoWithin: {
                        $centerSphere: [[params.lat, params.long], radiusInRadians],
                    },
                    },
                })).map(location => location.toObject());
    
                return locations;
            } catch (error: any) {
                throw new Error(error.message);
            }
        } catch (error: any) {
            throw new Error(`getByCoordinates - dataBase error - ${error.message}`);
        }
    }
}