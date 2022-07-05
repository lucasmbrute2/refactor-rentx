import { Router } from "express"
import { createCategoryController } from "../modules/useCases/createCategory/index"

const categoriesRouter = Router()

categoriesRouter.post("/", (req, res) => {
    return createCategoryController.handle(req, res)
})

export { categoriesRouter }
