import { Car } from "../infra/typeorm/entities/Car";
import { Specification } from "../infra/typeorm/entities/Specification";
import { IFindAllAvailableCarDTO } from "./in-memory/CarsRepositoryInMemory";

export interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: number;
    specifications?: Specification[]
    id?: number;
}

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car | Falsy>
    findAllAvailable({ category_id, brand, name }: IFindAllAvailableCarDTO): Promise<Car[] | Falsy>
    findById(id: number): Promise<Car | Falsy>
    updateAvailable(id: number, available: boolean): Promise<void>
}