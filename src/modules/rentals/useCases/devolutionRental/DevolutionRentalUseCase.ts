import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
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

    async execute({ id, user_id }: IRequest): Promise<void> {
        const MINIMUN_DAILY = 1

        const rental = await this.rentalsRepository.findByCarID(user_id)
        if (!rental) throw new AppError("Rental not found!");

        const car = await this.carsRepository.findById(id)
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

        await this.rentalsRepository.updateRental(rental)
        await this.carsRepository.updateAvailable(car?.id as number, true)
    }
}