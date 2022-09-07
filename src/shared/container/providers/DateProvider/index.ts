import { container } from "tsyringe"
import { DayJsDateProvider } from "./DayJsDateProvider"
import { IDateProvider } from "./IDateProvider"

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayJsDateProvider
)