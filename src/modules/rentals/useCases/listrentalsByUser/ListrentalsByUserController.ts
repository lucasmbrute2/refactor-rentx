import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListrentalsByUserUseCase } from "./ListrentalsByUserUseCase";

export class ListrentalsByUserController {
    async handle(req: Request, res: Response) {
        const listrentalsByUserUseCase = container.resolve(ListrentalsByUserUseCase)
        const { id: user_id } = req.user

        const rentals = await listrentalsByUserUseCase.execute(+user_id)

        return res.json(rentals).send()
    }
}