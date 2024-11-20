import { Request, Response } from "express";
import { ChatDataBase } from "../database";
import { CreateChat, GetByCoordinates, GetByCoordinatesResponse } from "../interfaces";
import { MessageResponse } from "../../../interfaces";
import { ChatEntityValidation } from "../entity";
import { Chat } from "../models/chat";
import { Validators } from "../helpers";

export class ChatServie {

    private dataBase: ChatDataBase;

    constructor(dataBase: ChatDataBase) {
        this.dataBase = dataBase;
    }

    async new(req: Request, res: Response<MessageResponse>) {
        const body: CreateChat = req.body;

        try {
            const chat: CreateChat = new ChatEntityValidation(body).get();
            await this.dataBase.new(chat);
            res.status(201).send({ message: "New chat created with success!" });
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }

    async getByCoordinates(req: Request, res: Response<GetByCoordinatesResponse | MessageResponse>) {
        const { lat, long, radiusInKm } = req.query as unknown as GetByCoordinates;

        try {
            const query: GetByCoordinates = new Validators().validateGetByCoordinates({ lat, long, radiusInKm });
            const chats: Chat[] = await this.dataBase.getByCoordinates(query);
            
            res.status(200).send({ chats });
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
}