import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayJsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory
let dayJsProvider: DayJsDateProvider
let dayAdd24hours: Date

describe("Create Rental", () => {

    beforeEach(() => {
        rentalRepositoryInMemory = new RentalsRepositoryInMemory
        dayJsProvider = new DayJsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayJsProvider);
        dayAdd24hours = dayJsProvider.dateAfter24Hours()
    })

    it("should not be able to create a rental to an car already rented", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: 1,
                user_id: 1,
                expected_return_date: dayAdd24hours
            })

            await createRentalUseCase.execute({
                car_id: 1,
                user_id: 2,
                expected_return_date: dayAdd24hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    it("should not be able to create a rental to an user that already rented a car", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: 1,
                user_id: 1,
                expected_return_date: dayAdd24hours
            })

            await createRentalUseCase.execute({
                car_id: 2,
                user_id: 1,
                expected_return_date: dayAdd24hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })


    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: 1,
            user_id: 1,
            expected_return_date: dayAdd24hours
        })

        expect(rental).toHaveProperty("id")
    })

    it("should not be able to create a new rental before 24 hours from another one", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: 5,
                user_id: 5,
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})