import { Chat } from "../models/chat";

export interface CreateChat {
    userName: string;
    message: string;
    location: {
        coordinates: [number, number];
    };
};

export interface GetByCoordinates {
    lat: number;
    long: number;
    radiusInKm: number;
}

export interface GetByCoordinatesResponse {
    chats: Chat[];
}