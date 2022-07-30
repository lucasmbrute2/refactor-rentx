import { IFindAllAvailableCarDTO } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

export class ListCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { category_id, brand, name } = req.query;
        const listCarsUseCase = container.resolve(ListCarsUseCase);

        const cars = await listCarsUseCase.execute({ category_id, brand, name } as IFindAllAvailableCarDTO);

        return res.json(cars)
    }
}