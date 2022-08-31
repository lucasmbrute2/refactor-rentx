import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayJsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory
let dayJsProvider: DayJsDateProvider
let dayAdd24hours: Date
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Rental", () => {
    beforeEach(() => {
        rentalRepositoryInMemory = new RentalsRepositoryInMemory
        dayJsProvider = new DayJsDateProvider()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayJsProvider, carsRepositoryInMemory);
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
        const { id: car_id } = await carsRepositoryInMemory.create({
            brand: "brand TEST",
            category_id: 1,
            daily_rate: 100,
            description: "descp TEST",
            fine_amount: 10,
            license_plate: "31313ada",
            name: "name test"
        })

        const rental = await createRentalUseCase.execute({
            car_id: car_id ?? 1,
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