import { request, Request, Response, Router } from "express";
import { LocationDataBase } from "./database";
import LocationModel from "./models/create-location";
import { LocationService } from "./service";

export const locationRouter = Router();
const dataBase: LocationDataBase = new LocationDataBase(LocationModel);
const service: LocationService = new LocationService(dataBase);

locationRouter.get('', (req: Request, res: Response) => {
    
    res.send("OI");
})

locationRouter.post('/new-location', service.newService);