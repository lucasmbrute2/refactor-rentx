import { Car } from "../infra/typeorm/entities/Car";
import { IFindAllAvailableCarDTO } from "./in-memory/CarsRepositoryInMemory";

export interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car | Falsy>
    findAllAvailable({ category_id, brand, name }: IFindAllAvailableCarDTO): Promise<Car[] | Falsy>
}