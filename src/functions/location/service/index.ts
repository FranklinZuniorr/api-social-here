import { Request, Response } from "express";
import { LocationDataBase } from "../database";
import { CreateLocation } from "../interfaces";
import { LocationEntityValidation } from "../entity";
import { MessageResponse } from "../../../interfaces";

export class LocationService {
    private dataBase: LocationDataBase;

    constructor(dataBase2: LocationDataBase) {
        this.dataBase = dataBase2;
    }

    async new(req: Request, res: Response<MessageResponse>) {
        const body: CreateLocation = req.body;
        
        try {
            const location: CreateLocation = new LocationEntityValidation(body).get();

            try {
                const existLocationUserName = await this.dataBase.getByUserName(location.userName);
    
                if(existLocationUserName) {
                    res.status(400).send({ message: 'UserName already in use!' });
                }
            } catch (error) {
                await this.dataBase.newLocation(location);
                res.status(201).send({ message: 'Location successfully created!' });
            }
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
}