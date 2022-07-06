import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./createSpecificationUseCase";

interface IRequest {
    req: Request;
    res: Response;
}

export class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

    async handle({ req, res }: IRequest) {

        const { name, description } = req.body

        try {
            await this.createSpecificationUseCase.execute({
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