import { Router } from "express"
import { CreateCategoryController } from "../modules/useCases/createCategory/createCategoryController"
import { ListCategoriesController } from "../modules/useCases/listCategories/listCategoriesController"
import { ImportCategoryController } from "../modules/useCases/importCategory/importCategoryController"
import multer from "multer"

const categoriesRouter = Router()
const upload = multer({
    dest: "./temp"
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()
categoriesRouter.post("/", createCategoryController.handle)

categoriesRouter.get("/", listCategoriesController.handle)

categoriesRouter.post("/import", upload.single("file"), importCategoryController.handle)

export { categoriesRouter }
