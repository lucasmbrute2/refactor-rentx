import { Response, Request } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "../importCategory/importCategoryUseCase"

export class ImportCategoryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { file } = req;
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

        if (!file) return res.status(404).send()

        await importCategoryUseCase.execute(file)

        return res.status(201).send({
            message: "File imported with success!"
        });
    }
}