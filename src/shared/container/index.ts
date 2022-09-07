import { container } from "tsyringe"
import "@shared/container/providers/DateProvider/index"
import "@shared/container/providers/MailProvider/index"
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository"
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationReposity"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImagesRepositories } from "@modules/cars/repositories/ICarsImagesRepositories"
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository"
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository"
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository"
import { IDateProvider } from "./providers/DateProvider/IDateProvider"
import { DayJsDateProvider } from "./providers/DateProvider/DayJsDateProvider"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImagesRepositories>(
    "CarsImagesRepository",
    CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

container.registerSingleton<IUserTokensRepository>(
    "UserTokensRepository",
    UserTokensRepository
)

container.registerSingleton<IDateProvider>(
    "DayJsDateProvider",
    DayJsDateProvider
)