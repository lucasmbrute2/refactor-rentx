import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IRequest } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { Rental } from "../entities/Rental";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayJsDateProvider"
export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = AppDataSource.getRepository(Rental)
    }

    async create(data: IRequest): Promise<Rental> {
        const dayJsDateProvider = new DayJsDateProvider()

        const rental = this.repository.create({
            ...data,
            created_at: dayJsDateProvider.dateNow(),
            start_date: dayJsDateProvider.dateNow(),
            end_date: dayJsDateProvider.dateAfter24Hours(),
            expected_return_data: dayJsDateProvider.dateAfter24Hours(),
            updated_at: dayJsDateProvider.dateNow()
        })
        return await this.repository.save(rental)
    }

    async findByCarID(car_id: number): Promise<Rental | Falsy> {
        return await this.repository.findOneBy({
            car_id
        })
    }

    async findByUser(user_id: number): Promise<Rental | Falsy> {
        return await this.repository.findOneBy({
            user_id
        })
    }

}