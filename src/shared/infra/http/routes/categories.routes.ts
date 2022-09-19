import { Router } from "express"
import uploadConfig from "../../../../configs/uploads/upload"
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/createCategoryController"
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/listCategoriesController"
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/importCategoryController"
import multer from "multer"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

const categoriesRouter = Router()

const uploadFile = multer(uploadConfig)

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRouter.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle)
categoriesRouter.get("/", listCategoriesController.handle)
categoriesRouter.post("/import", uploadFile.single("file"), ensureAuthenticated, ensureAdmin, importCategoryController.handle)

export { categoriesRouter }
