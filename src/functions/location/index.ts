import { Request, Response, Router } from "express";
import { LocationDataBase } from "./database";
import LocationModel from "./models/create-location";
import { LocationService } from "./service";

export const locationRouter = Router();
const dataBase: LocationDataBase = new LocationDataBase(LocationModel);
const service: LocationService = new LocationService(dataBase);

locationRouter.get('', (req: Request, res: Response) => {
    res.send("Working!");
})

locationRouter.post('/new-location', (req: Request, res: Response) => service.new(req, res));
locationRouter.put('/location', (req: Request, res: Response) => service.update(req, res));
locationRouter.get('/locations-by-coordinates', (req: Request, res: Response) => service.getByCoordinates(req, res));