import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs"

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {
    const dayAdd24hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalRepositoryInMemory = new RentalsRepositoryInMemory
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
    })

    it("should not be able to create a rental to an car already rented", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "Carro id",
                user_id: "Id do user",
                expected_return_date: dayAdd24hours
            })

            await createRentalUseCase.execute({
                car_id: "Carro id",
                user_id: "Id do user2",
                expected_return_date: dayAdd24hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    it("should not be able to create a rental to an user that already rented a car", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "Carro id",
                user_id: "Id do user",
                expected_return_date: dayAdd24hours
            })

            await createRentalUseCase.execute({
                car_id: "Carro id2",
                user_id: "Id do user",
                expected_return_date: dayAdd24hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })


    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "Carro id",
            user_id: "Id do user",
            expected_return_date: dayAdd24hours
        })

        expect(rental).toHaveProperty("id")
    })

    it("should not be able to create a new rental before 24 hours from another one", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "Carro id 5",
                user_id: "Id do user 5",
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})