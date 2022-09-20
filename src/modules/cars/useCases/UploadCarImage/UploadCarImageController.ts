import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
    filename: string;
}

export class UploadCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const images = req.files as IFiles[]
        const uploadCarImagUseCase = container.resolve(UploadCarImageUseCase)

        const images_name = images?.map(file => file.filename)

        await uploadCarImagUseCase.execute({
            car_id: Number(id),
            images_name
        })

        return res.status(201).send();
    }
}