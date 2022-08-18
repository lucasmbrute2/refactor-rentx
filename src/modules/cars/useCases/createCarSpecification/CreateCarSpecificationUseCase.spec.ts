import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepository: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationRepositoryInMemory);
    })

    it("should not be able to add a new specification to a non existent car ID or specification ID", () => {
        expect(async () => {
            await createCarSpecificationUseCase.execute({
                car_id: 1,
                specifications_id: [1]
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to add a new specification to car", async () => {
        const car = await carsRepository.create({
            brand: "Brand test Car",
            category_id: 1,
            daily_rate: 1,
            description: "Description test Car",
            fine_amount: 1,
            license_plate: "1234",
            name: "Name Car test"
        })

        const specification = await specificationRepositoryInMemory.create({
            description: "description test",
            name: "name test"
        })

        const specificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id as number,
            specifications_id: [specification.id as number]
        })


        expect(specificationCars).toHaveProperty("specifications")
        expect(specificationCars.specifications.length).toBe(1)

    })
})