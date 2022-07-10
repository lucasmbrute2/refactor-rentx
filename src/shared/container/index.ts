import { container } from "tsyringe"
import { ICategoriesRepository } from "../../modules/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/repositories/implementations/CategoriesRepository"
import { SpecificationRepository } from "../../modules/repositories/implementations/SpecificationRepository"
import { ISpecificationRepository } from "../../modules/repositories/ISpecificationReposity"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
)