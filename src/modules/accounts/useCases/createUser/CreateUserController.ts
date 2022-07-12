import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createUserUseCase = container.resolve(CreateUserUseCase)
        const data = req.body

        try {
            await createUserUseCase.execute(data)
            return res.status(201).send();

        } catch (error) {
            res.status(404).send({ error })

        }
        return res.status(201).send();
    }
}