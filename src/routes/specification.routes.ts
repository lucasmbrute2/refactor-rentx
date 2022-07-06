import { Router } from "express"
import { createSpecificationController } from "../modules/useCases/createSpecification/index"
const specificationRouter = Router()

specificationRouter.post("/", (req, res) => {
    return createSpecificationController.handle({ req, res })
})

export { specificationRouter }