import { ListCategoriesUseCase } from "./listCategoriesUseCase";
import { Request, Response } from "express"

export class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const allCategories = await this.listCategoriesUseCase.execute()
            return res.json(allCategories)
        } catch (error) {
            return res.status(404).send({ message: "Categories not found" })
        }
    }
}