import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createRentalUseCase = container.resolve(CreateRentalUseCase)
        const { car_id, expected_return_date } = req.body
        const { id: user_id } = req.user

        const rental = await createRentalUseCase.execute({
            car_id,
            user_id,
            expected_return_date
        })

        return res.status(201).json(rental)
    }
}