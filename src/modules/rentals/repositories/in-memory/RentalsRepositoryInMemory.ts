import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRequest } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
    rental: Rental[] = [];

    async create({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
        const rentalObj = Object.assign(new Rental(), {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date()
        })

        this.rental.push(rentalObj)
        return await rentalObj;
    }

    async findByCarID(car_id: number): Promise<Rental | Falsy> {
        return await this.rental.find(rental => rental.car_id === car_id && !rental.end_date);
    }

    async findByUser(user_id: number): Promise<Rental | Falsy> {
        return await this.rental.find(rental => rental.user_id === user_id && !rental.end_date)
    }

    async findByID(id: number): Promise<Rental | Falsy> {
        return await this.rental.find(rental => rental.id === id)
    }

    async updateRental(rental: Rental): Promise<Rental | Falsy> {
        const updateRental = await this.rental.findIndex(rentals => rentals.id === rental.id)
        if (updateRental) return;
        this.rental[updateRental] = rental

        return rental
    }
}