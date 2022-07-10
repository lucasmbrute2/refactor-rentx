import { Router } from "express"
import { CreateCategoryController } from "../modules/useCases/createCategory/createCategoryController"
import { listCategoriesController } from "../modules/useCases/listCategories/index"
import { ImportCategoryController } from "../modules/useCases/importCategory/importCategoryController"

const categoriesRouter = Router()

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
categoriesRouter.post("/", createCategoryController.handle)

categoriesRouter.get("/", (req, res) => {
    return listCategoriesController.handle(req, res)
})

categoriesRouter.post("/import", importCategoryController.handle)

export { categoriesRouter }
