import { ICarsImagesRepositories } from "@modules/cars/repositories/ICarsImagesRepositories";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { CarImage } from "../entities/CarImages";

export class CarsImagesRepository implements ICarsImagesRepositories {
    private repository: Repository<CarImage>

    constructor() {
        this.repository = AppDataSource.getRepository(CarImage)
    }

    async create(car_id: number, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name
        })

        return await this.repository.save(carImage)
    }

}