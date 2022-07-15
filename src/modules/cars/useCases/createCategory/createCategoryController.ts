import { Request, Response } from "express"
import { CreateCategoryUseCase } from "../createCategory/createCategoryUseCase"
import { container } from "tsyringe"

export class CreateCategoryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

        try {
            await createCategoryUseCase.execute({ name, description });
        } catch (error) {
            res.status(400).send(error);
        }
        return res.status(201).send();
    }

}