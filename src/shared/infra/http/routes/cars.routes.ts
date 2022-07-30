import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCases/ListCars/ListCarsController";
import { Router } from "express"
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
const carsRouter = Router();

const createCarController = new CreateCarController()
const listAvailableControler = new ListCarsController()

carsRouter.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRouter.get("/available", listAvailableControler.handle)

export { carsRouter }