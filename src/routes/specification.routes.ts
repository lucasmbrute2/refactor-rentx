import { Router } from "express"
import { CreateSpecificationController } from "../modules/useCases/createSpecification/createSpecificationController"

const specificationRouter = Router()

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post("/", createSpecificationController.handle)

export { specificationRouter }