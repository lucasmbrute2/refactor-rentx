import { CarImage } from "../infra/typeorm/entities/CarImages";

export interface ICarsImagesRepositories {
    create(car_id: number, image_name: string): Promise<CarImage>
}