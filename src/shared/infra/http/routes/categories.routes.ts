import { Router } from "express"
import uploadConfig from "../../../../configs/uploads/upload"
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/createCategoryController"
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/listCategoriesController"
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/importCategoryController"
import multer from "multer"

const categoriesRouter = Router()

const uploadFile = multer(uploadConfig.upload("./temp"))

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRouter.post("/", createCategoryController.handle)
categoriesRouter.get("/", listCategoriesController.handle)
categoriesRouter.post("/import", uploadFile.single("file"), importCategoryController.handle)

export { categoriesRouter }