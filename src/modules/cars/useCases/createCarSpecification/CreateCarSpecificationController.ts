import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarSpecificationController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)
        const { id: car_id } = req.params
        const { specifications_id } = req.body;

        const cars = await createCarSpecificationUseCase.execute({ car_id: Number(car_id), specifications_id })

        return res.json(cars)
    }
}