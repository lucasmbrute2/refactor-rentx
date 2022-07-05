import { Router } from "express"
import { createCategoryController } from "../modules/useCases/createCategory/index"
import { listCategoriesController } from "../modules/useCases/listCategories/index"

const categoriesRouter = Router()

categoriesRouter.post("/", (req, res) => {
    return createCategoryController.handle(req, res)
})

categoriesRouter.get("/", (req, res) => {
    return listCategoriesController.handle(req, res)
})

export { categoriesRouter }
