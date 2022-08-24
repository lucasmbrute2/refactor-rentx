import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
    async handle(req: Request, res: Response) {
        const { user: { id: user_id } } = req;
        const avatar_file = req.file?.filename;
        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

        if (!avatar_file) throw new AppError("Avatar file not found.");

        updateUserAvatarUseCase.execute({ user_id: Number(user_id), avatar_file })

        return res.status(204).send();
    }
}