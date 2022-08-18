import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepository);
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            brand: "Brand test Car",
            category_id: 1,
            daily_rate: 1,
            description: "Description test Car",
            fine_amount: 1,
            license_plate: "1234",
            name: "Name Car test"
        });

        expect(car).toHaveProperty("id")
    })

    it("should not be able to create a car with a existing license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                brand: "Brand test Car",
                category_id: 1,
                daily_rate: 1,
                description: "Description test Car",
                fine_amount: 1,
                license_plate: "1234",
                name: "Name Car test"
            });

            await createCarUseCase.execute({
                brand: "Brand test Car2",
                category_id: 1,
                daily_rate: 1,
                description: "Description test Car",
                fine_amount: 1,
                license_plate: "1234",
                name: "Name Car test"
            });
        }).rejects.toBeInstanceOf(AppError)
    })

    it("car should be registered with available true", async () => {
        const car = await createCarUseCase.execute({
            brand: "Car Available",
            category_id: 1,
            daily_rate: 1,
            description: "Description test Car",
            fine_amount: 1,
            license_plate: "1234",
            name: "Name Car test"
        })

        expect(car.available).toBe(true)

    })
})