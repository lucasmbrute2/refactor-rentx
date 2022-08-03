import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {
    beforeEach(() => {
        rentalRepositoryInMemory = new RentalsRepositoryInMemory
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
    })

    it("should not be able to create a rental to an car already rented", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "Carro id",
                user_id: "Id do user",
                expected_return_date: new Date()
            })

            await createRentalUseCase.execute({
                car_id: "Carro id",
                user_id: "Id do user2",
                expected_return_date: new Date()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    it("should not be able to create a rental to an user that already rented a car", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "Carro id",
                user_id: "Id do user",
                expected_return_date: new Date()
            })

            await createRentalUseCase.execute({
                car_id: "Carro id2",
                user_id: "Id do user",
                expected_return_date: new Date()
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "Carro id",
            user_id: "Id do user",
            expected_return_date: new Date()
        })

        expect(rental).toHaveProperty("id")
    })

})