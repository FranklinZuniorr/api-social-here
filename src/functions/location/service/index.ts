import { Request, Response } from "express";
import { LocationDataBase } from "../database";
import { CreateLocation, GetByCoordinates, GetByCoordinatesResponse, NewLocationResponse, UpdateLocation } from "../interfaces";
import { LocationEntityValidation } from "../entity";
import { MessageResponse } from "../../../interfaces";
import { Validators } from "../helpers";
import { Location } from "../models/create-location";

export class LocationService {
    private dataBase: LocationDataBase;

    constructor(dataBase2: LocationDataBase) {
        this.dataBase = dataBase2;
    }

    async new(req: Request, res: Response<MessageResponse | NewLocationResponse>) {
        const body: CreateLocation = req.body;
        
        try {
            const location: CreateLocation = new LocationEntityValidation(body).get();

            try {
                const existLocationUserName = await this.dataBase.getByUserName(location.userName);
    
                if(existLocationUserName) {
                    res.status(400).send({ message: 'UserName already in use!' });
                }
            } catch (error) {
                const newLocation = await this.dataBase.newLocation(location);
                res.status(201).send({ message: 'Location successfully created!', locationId: newLocation._id.toHexString() });
            }
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }

    async update(req: Request, res: Response<MessageResponse>) {
        const body: UpdateLocation = req.body;

        try {
            const locationUpdate = new Validators().validateUpdate(body);
            await this.dataBase.updateLocation(locationUpdate);
            res.status(200).send({ message: 'Location successfully updated!' });
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }

    async getByCoordinates(req: Request, res: Response<GetByCoordinatesResponse | MessageResponse>) {
        const body: GetByCoordinates = req.body;

        try {
            const query: GetByCoordinates = new Validators().validateGetByCoordinates(body);
            const locations: Location[] = await this.dataBase.getByCoordinates(query);
            
            res.status(200).send({ locations });
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
}