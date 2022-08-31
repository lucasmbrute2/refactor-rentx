import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListrentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) { }

    async execute(user_id: number): Promise<Rental> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id)

        if (!rentalsByUser) throw new AppError("Rental not found");

        return rentalsByUser
    }
}