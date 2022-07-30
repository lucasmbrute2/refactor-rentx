import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createUserUseCase = container.resolve(CreateUserUseCase)
        const { name, password, email, driver_license, avatar } = req.body

        await createUserUseCase.execute({
            name,
            password,
            email,
            driver_license,
            avatar: avatar || ""
        })

        return res.status(201).send();
    }
}