import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IRequest } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = AppDataSource.getRepository(Rental)
    }

    async create(data: IRequest): Promise<Rental> {
        const rental = this.repository.create(data)
        return await this.repository.save(rental)
    }

    async findByCarID(car_id: string): Promise<Rental | Falsy> {
        return await this.repository.findOneBy({
            car_id
        })
    }

    async findByUser(user_id: string): Promise<Rental | Falsy> {
        return await this.repository.findOneBy({
            user_id
        })
    }

}