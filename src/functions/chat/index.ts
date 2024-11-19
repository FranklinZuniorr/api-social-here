import { Request, Response, Router } from "express";
import { ChatDataBase } from "./database";
import ChatModel from "./models/chat";
import { ChatServie } from "./service";

export const chatRouter = Router();
const dataBase: ChatDataBase = new ChatDataBase(ChatModel);
const service: ChatServie = new ChatServie(dataBase);

chatRouter.post('/new-chat', (req: Request, res: Response) => service.new(req, res));
chatRouter.get('/chats-by-coordinates', (req: Request, res: Response) => service.getByCoordinates(req, res));