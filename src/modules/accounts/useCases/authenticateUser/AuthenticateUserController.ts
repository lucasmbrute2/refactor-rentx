import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body
        const authUseCase = container.resolve(AuthenticateUserUseCase);

        try {
            const token = await authUseCase.execute({ email, password })
            return res.status(201).json(token)

        } catch (error) {
            return res.status(404).json(error)
        }
    }
}