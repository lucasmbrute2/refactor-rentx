import { CreateCategoryController } from "../createCategory/createCategoryController"
import { CreateCategoryUseCase } from "../createCategory/createCategoryUseCase"
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"


const createCategoryRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(createCategoryRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);
export { createCategoryController }
