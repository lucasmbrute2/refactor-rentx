import { ListCategoriesUseCase } from "./listCategoriesUseCase";
import { Request, Response } from "express"
import { container } from "tsyringe";

export class ListCategoriesController {
    async handle(req: Request, res: Response): Promise<Response> {

        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

        const allCategories = await listCategoriesUseCase.execute()
        return res.json(allCategories)
    }
}