import { container } from "tsyringe"
import { DayJsDateProvider } from "./DateProvider/DayJsDateProvider"
import { IDateProvider } from "./DateProvider/IDateProvider"

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayJsDateProvider
)