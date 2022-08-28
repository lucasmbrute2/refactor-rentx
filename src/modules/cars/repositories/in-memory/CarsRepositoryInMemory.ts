import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

export interface IFindAllAvailableCarDTO {
    brand?: string,
    category_id?: number,
    name?: string
}

export class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async findByLicensePlate(license_plate: string): Promise<Car | Falsy> {
        return this.cars.find(car => car.license_plate === license_plate)
    }

    async create(car: ICreateCarDTO): Promise<Car> {
        const { brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id } = car
        const carObj = new Car()

        Object.assign(carObj, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id
        })

        await this.cars.push(carObj)
        return carObj
    }

    async findAllAvailable(data: IFindAllAvailableCarDTO): Promise<Car[] | Falsy> {
        const objecttWithAvailableValues = Object.entries(data).filter(hashMap => hashMap[1])
        // @ts-ignore
        return this.cars.filter(car => car.available).filter(cars => objecttWithAvailableValues.map((keys, i) => cars[keys] === objecttWithAvailableValues[i])
        )
    }

    async findById(id: number): Promise<Falsy | Car> {
        return this.cars.find(car => car.id === id)
    }

    async updateAvailable(id: number, available: boolean): Promise<void> {
        const car = await this.cars.find(car => car.id === id)
        if (!car) return;
        car.available = available
    }
}