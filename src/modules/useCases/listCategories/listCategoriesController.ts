import { ListCategoriesUseCase } from "./listCategoriesUseCase";
import { Request, Response } from "express"
import { container } from "tsyringe";

export class ListCategoriesController {
    async handle(req: Request, res: Response): Promise<Response> {

        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

        try {
            const allCategories = await listCategoriesUseCase.execute()
            return res.json(allCategories)
        } catch (error) {
            return res.status(404).send({ message: "Categories not found" })
        }
    }
}