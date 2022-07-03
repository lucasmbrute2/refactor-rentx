import { Request, response, Response } from "express"
import { CreateCategoryUseCase } from "../createCategory/createCategoryUseCase"


export class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;

        try {
            this.createCategoryUseCase.execute({ name, description })

        } catch (error) {
            response.status(500).send({ error })
        }
        return response.status(201).send();
    }

}