import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async findByLicensePlate(license_plate: string): Promise<Car | Falsy> {
        return this.cars.find(car => car.license_plate === license_plate)
    }

    async create(car: ICreateCarDTO): Promise<Car> {
        const { brand, category_id, daily_rate, description, fine_amount, license_plate, name } = car
        const carObj = new Car()

        Object.assign(carObj, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name
        })

        await this.cars.push(carObj)
        return carObj
    }

}