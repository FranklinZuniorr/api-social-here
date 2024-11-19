import { Request, Response } from "express";
import { ChatDataBase } from "../database";
import { CreateChat } from "../interfaces";
import { MessageResponse } from "../../../interfaces";
import { ChatEntityValidation } from "../entity";

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
}