import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

export interface IFindAllAvailableCarDTO {
    brand?: string,
    category_id?: string,
    name?: string
}

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

    async findAllAvailable(data: IFindAllAvailableCarDTO): Promise<Car[] | Falsy> {
        // @ts-ignore
        const availableKeys = Object.keys(data).filter(value => data[value])
        // @ts-ignore
        const availableValues = availableKeys.map(value => data[value])
        // @ts-ignore 
        return this.cars.filter(car => car.available).filter(cars => availableKeys.map((keys, i) => cars[keys] === availableValues[i])
        )
    }
}