import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { token } = req.query;
        const { password } = req.body

        if (!token) throw new AppError("Token not found");

        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

        await resetPasswordUseCase.execute(token?.toString(), password)

        return res.status(200).send()
    }
}