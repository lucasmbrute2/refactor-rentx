import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";



@injectable()
export class CreateCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }


    async execute(data: ICreateCarDTO): Promise<Car> {

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(data.license_plate)

        if (carAlreadyExists) throw new AppError("Car Already exists!");

        return await this.carsRepository.create(data)
    }
}