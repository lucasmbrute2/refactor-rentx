import { Rental } from "../infra/typeorm/entities/Rental";
import { IRequest } from "../useCases/createRental/CreateRentalUseCase";

export interface IRentalsRepository {
    create({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental>
    findByCarID(car_id: number): Promise<Rental | Falsy>
    findByUser(user_id: number): Promise<Rental | Falsy>
}