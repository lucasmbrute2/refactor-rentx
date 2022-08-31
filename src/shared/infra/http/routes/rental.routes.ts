import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListrentalsByUserController } from "@modules/rentals/useCases/listrentalsByUser/ListrentalsByUserController";
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
const rentalRouter = Router();

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listrentalsByUserController = new ListrentalsByUserController()

rentalRouter.post("/", ensureAuthenticated, createRentalController.handle)
rentalRouter.put("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)
rentalRouter.get("/user", ensureAuthenticated, listrentalsByUserController.handle)

export { rentalRouter }