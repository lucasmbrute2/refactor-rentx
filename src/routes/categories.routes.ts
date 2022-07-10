import { Router } from "express"
import { CreateCategoryController } from "../modules/useCases/createCategory/createCategoryController"
import { listCategoriesController } from "../modules/useCases/listCategories/index"

const categoriesRouter = Router()

const createCategoryController = new CreateCategoryController()

categoriesRouter.post("/", createCategoryController.handle)

categoriesRouter.get("/", (req, res) => {
    return listCategoriesController.handle(req, res)
})

export { categoriesRouter }
