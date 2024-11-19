import { Model } from "mongoose";
import { Chat } from "../models/chat";
import { CreateChat } from "../interfaces";
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
}