import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>
    constructor() {
        this.repository = AppDataSource.getRepository(Car)
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create(data)
        return await this.repository.save(car)
    }

    async findByLicensePlate(license_plate: string): Promise<Car | Falsy> {
        return this.repository.findOneBy({ license_plate })
    }

}