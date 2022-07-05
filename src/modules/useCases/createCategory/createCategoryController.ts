import { Request, Response } from "express"
import { CreateCategoryUseCase } from "../createCategory/createCategoryUseCase"

export class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;

        try {
            await this.createCategoryUseCase.execute({ name, description });
        } catch (error) {
            res.status(400).send({ error });
        }
        return res.status(201).send();
    }

}