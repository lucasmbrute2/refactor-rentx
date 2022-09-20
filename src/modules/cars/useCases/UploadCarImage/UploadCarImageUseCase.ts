import { ICarsImagesRepositories } from "@modules/cars/repositories/ICarsImagesRepositories";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: number;
    images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImages: ICarsImagesRepositories,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider

    ) { }

    async execute({ car_id, images_name }: IRequest) {
        images_name.forEach(async (image) => {
            await this.carsImages.create(car_id, image)
            await this.storageProvider.save(image, "cars")
        })
    }
}