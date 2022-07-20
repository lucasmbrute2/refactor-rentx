import { Request, Response } from "express"
import { CreateCategoryUseCase } from "../createCategory/createCategoryUseCase"
import { container } from "tsyringe"
import { AppError } from "../../../../errors/AppError";

export class CreateCategoryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
        await createCategoryUseCase.execute({ name, description });

        return res.status(201).send();
    }
}