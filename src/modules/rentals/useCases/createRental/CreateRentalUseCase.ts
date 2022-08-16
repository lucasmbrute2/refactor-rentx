import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayJsDateProvider";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";

export interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

export class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository,
        private dateProvider: IDateProvider
    ) { }
    async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {

        const MINIMUM_COMPARE_HOURS = 24;
        const carAlreadyRented = await this.rentalsRepository.findByCarID(car_id)
        const userAlreadyRentedACar = await this.rentalsRepository.findByUser(user_id)

        if (carAlreadyRented) throw new AppError("This car is already rented");
        if (userAlreadyRentedACar) throw new AppError("User has already rented a car");

        const compareResult = this.dateProvider.compareInHours(this.dateProvider.dateNow(), expected_return_date)

        if (compareResult < MINIMUM_COMPARE_HOURS) throw new AppError("Invalid return time.")

        const car = this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date
        })

        if (!car) throw new AppError("Car could not be created")
        return car
    }
}