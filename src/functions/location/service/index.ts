import { Request, Response } from "express";
import { LocationDataBase } from "../database";

export class LocationService {
    private dataBase: LocationDataBase;

    constructor(dataBase: LocationDataBase) {
        this.dataBase = dataBase;
    }

    async newService(req: Request, res: Response) {

    }
}