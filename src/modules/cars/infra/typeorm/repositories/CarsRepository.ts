import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { IFindAllAvailableCarDTO } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>
    constructor() {
        this.repository = AppDataSource.getRepository(Car)
    }

    async findAllAvailable({ category_id, brand, name }: IFindAllAvailableCarDTO): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("cars")
            .where("cars.available = :available", { available: true });

        if (category_id) carsQuery.andWhere("cars.category_id = :category_id", { category_id })
        if (brand) carsQuery.andWhere("cars.brand = :brand", { brand })
        if (name) carsQuery.andWhere("cars.name = :name", { name })

        return await carsQuery.getMany()
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create(data)
        return await this.repository.save(car)
    }

    async findByLicensePlate(license_plate: string): Promise<Car | Falsy> {
        return this.repository.findOneBy({ license_plate })
    }

    async findById(id: number): Promise<Car | Falsy> {
        const [car] = await this.repository.find({
            where: {
                id
            }
        })

        return car;
    }

    async updateAvailable(id: number, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update(Car)
            .set({ available })
            .where("id=:id")
            .setParameters({ id })
            .execute();
    }
}