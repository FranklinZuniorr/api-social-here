import { Model } from "mongoose";
import { Chat } from "../models/chat";
import { CreateChat, GetByCoordinates } from "../interfaces";
import { ENUM_LOCATION_TYPE } from "../../../constants";

export class ChatDataBase {

    private model: Model<Chat>;

    constructor(model: Model<Chat>) {
        this.model = model;
    }

    async new(params: CreateChat) {
        try {
            const chat: Chat = {...params, location: { type: ENUM_LOCATION_TYPE.POINT, coordinates: params.location.coordinates }};
            await this.model.create(chat);
        } catch (error) {
           throw new Error("new - dataBase error"); 
        }
    }

    async getByCoordinates(params: GetByCoordinates): Promise<Chat[]> {
        try {
            const earthRadiusInKm = 6378.1;
            const radiusInRadians = params.radiusInKm / earthRadiusInKm;

            try {
                const chats: Chat[] = (await this.model.find({
                    location: {
                    $geoWithin: {
                        $centerSphere: [[params.lat, params.long], radiusInRadians],
                    },
                    },
                })).map(chat => chat.toObject());
    
                return chats;
            } catch (error: any) {
                throw new Error(error.message);
            }
        } catch (error: any) {
            throw new Error(`getByCoordinates - dataBase error - ${error.message}`);
        }
    }
}