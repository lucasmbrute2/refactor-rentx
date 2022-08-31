import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: number;
    user_id: number
}

@injectable()
export class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const MINIMUN_DAILY = 1

        const rental = await this.rentalsRepository.findByCarID(id)
        if (!rental) throw new AppError("Rental not found!");

        const car = await this.carsRepository.findById(rental.car_id)
        if (!car) throw new AppError("Car not found!");

        const dateNow = await this.dateProvider.dateNow()
        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        )

        if (daily < MINIMUN_DAILY) daily = MINIMUN_DAILY;

        const delay = await this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_data
        )

        rental.total = (car.daily_rate + delay ?? 0) * daily
        rental.end_date = dateNow

        const updatedRental = await this.rentalsRepository.updateRental(rental)
        if (!updatedRental) throw new AppError("Rental couldn't be updated");

        await this.carsRepository.updateAvailable(car?.id as number, true)
        return updatedRental;
    }
}