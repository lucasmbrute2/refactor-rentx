import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IFindAllAvailableCarDTO } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ category_id, brand, name }: IFindAllAvailableCarDTO): Promise<Car[] | Falsy> {
        return await this.carsRepository.findAllAvailable({ category_id, brand, name })
    }
}