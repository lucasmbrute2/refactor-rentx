import { ICarsImagesRepositories } from "@modules/cars/repositories/ICarsImagesRepositories";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: number;
    images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImages: ICarsImagesRepositories
    ) { }

    async execute({ car_id, images_name }: IRequest) {
        images_name.forEach(async (image) => {
            await this.carsImages.create(car_id, image)
        })
    }
}