import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationReposity";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: number;
    specifications_id: number[]
}

@injectable()
export class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const car = await this.carsRepository.findById(car_id)
        if (!car) throw new AppError("Car does not exists!");

        const specifications = await this.specificationRepository.findByIds(specifications_id)
        if (!specifications) throw new AppError("Specifications not found!");

        car.specifications = specifications
        return await this.carsRepository.create(car)
    }
}