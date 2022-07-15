import { Router } from "express"
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/createSpecificationController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRouter = Router()

const createSpecificationController = new CreateSpecificationController();

specificationRouter.use(ensureAuthenticated)
specificationRouter.post("/", createSpecificationController.handle)

export { specificationRouter }