import { Router } from "express"
import { CreateCategoryController } from "../modules/useCases/createCategory/createCategoryController"
import { listCategoriesController } from "../modules/useCases/listCategories/index"
import { ImportCategoryController } from "../modules/useCases/importCategory/importCategoryController"
import multer from "multer"

const categoriesRouter = Router()
const upload = multer({
    dest: "./temp"
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
categoriesRouter.post("/", createCategoryController.handle)

categoriesRouter.get("/", (req, res) => {
    return listCategoriesController.handle(req, res)
})

categoriesRouter.post("/import", upload.single("file"), importCategoryController.handle)

export { categoriesRouter }
