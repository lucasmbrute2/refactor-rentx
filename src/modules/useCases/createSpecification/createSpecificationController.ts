import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "../createSpecification/createSpecificationUseCase"


export class CreateSpecificationController {
    async handle(req: Request, res: Response) {
        const { name, description } = req.body

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
        try {
            await createSpecificationUseCase.execute({
                name,
                description
            })
            res.send({
                message: "Specification created with success!"
            })
        } catch (error) {
            res.status(404).send({
                message: `Fail: ${error}`
            })
        }
    }

}