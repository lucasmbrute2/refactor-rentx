import { CarImage } from "../infra/typeorm/entities/CarImages";

export interface ICarsImagesRepositories {
    create(car_id: string, image_name: string): Promise<CarImage>
}