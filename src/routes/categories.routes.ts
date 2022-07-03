import { Router } from "express"
import { createCategoryController } from "../modules/useCases/createCategory"

const categoriesRouter = Router()

categoriesRouter.post("/", (req, res) => {
    return createCategoryController.handle(req, res)
})

export { categoriesRouter }
