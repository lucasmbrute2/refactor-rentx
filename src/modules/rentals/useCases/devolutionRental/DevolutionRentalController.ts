import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

export class DevolutionRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)
        const { id: user_id } = req.user
        const { id: rental_id } = req.params

        const rental = await devolutionRentalUseCase.execute({ user_id: + user_id, id: +rental_id })

        return res.status(200).json(rental)
    }
}