import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro Test",
            description: "Muscle Test",
            daily_rate: 1.00,
            license_plate: "test",
            fine_amount: 100,
            brand: "test",
            category_id: 1
        })
        const car2 = await carsRepositoryInMemory.create({
            name: "Carro Tes2t",
            description: "Muscle Test2",
            daily_rate: 2.00,
            license_plate: "test2",
            fine_amount: 200,
            brand: "test2",
            category_id: 2
        })
        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([car, car2])
    })

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro Test2",
            description: "Muscle Test2",
            daily_rate: 2.00,
            license_plate: "test2",
            fine_amount: 200,
            brand: "test2",
            category_id: 2
        })
        const cars = await listCarsUseCase.execute({ name: car.name });

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro Test3",
            description: "Muscle Test3",
            daily_rate: 3.00,
            license_plate: "test3",
            fine_amount: 300,
            brand: "test3",
            category_id: 3
        })
        const cars = await listCarsUseCase.execute({ category_id: car.category_id, });

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro Test4",
            description: "Muscle Test4",
            daily_rate: 4.00,
            license_plate: "test4",
            fine_amount: 400,
            brand: "test4",
            category_id: 4
        })
        const cars = await listCarsUseCase.execute({ brand: car.brand });

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by 2 filters", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro Test5",
            description: "Muscle Test5",
            daily_rate: 5.00,
            license_plate: "test5",
            fine_amount: 500,
            brand: "test5",
            category_id: 5
        })
        const cars = await listCarsUseCase.execute({ category_id: car.category_id, brand: car.brand });
        expect(cars).toEqual([car])
    })
})