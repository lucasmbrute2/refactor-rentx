import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IRequest } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { IsNull, Repository } from "typeorm";
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
            expected_return_data: dayJsDateProvider.dateAfter24Hours(),
            updated_at: dayJsDateProvider.dateNow()
        })
        return await this.repository.save(rental)
    }

    async findByCarID(car_id: number): Promise<Rental | Falsy> {
        const rental = await this.repository.find({
            where: {
                car_id,
                end_date: IsNull()
            }
        })

        if (!rental.length) return null;
        return rental[0]
    }

    async findByUser(user_id: number): Promise<Rental | Falsy> {
        const rental = await this.repository.find({
            where: {
                user_id,
                end_date: IsNull()
            }
        })

        if (!rental.length) return null;
        return rental[0]
    }

    async findByID(id: number): Promise<Rental | Falsy> {
        return await this.repository.findOneBy({
            id
        })
    }

    async updateRental(rental: Rental): Promise<Rental | Falsy> {
        await this.repository
            .createQueryBuilder()
            .update(Rental)
            .set({ ...rental })
            .where("id=:id", { id: rental.id })
            .execute();

        return await this.findByID(rental.id as number)
    }

}