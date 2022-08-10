import { migrations1657165082853 } from "./1657165082853-migrations"
import { CreateCategories1654826967781 } from "./1656986536350-migrations"
import { User1657602031073 } from "./1657602031073-User"
import { AlterUserDeleteUserName1657774263727 } from "./1657774263727-AlterUserDeleteUserName"
import { AlterUserAddAvatar1658376169074 } from "./1658376169074-AlterUserAddAvatar"
import { CreateCars1658791215491 } from "./1658791215491-CreateCars"
import { CreateSpecificationCars1659206068902 } from "./1659206068902-CreateSpecificationCars"
import { CarImages1659402018995 } from "./1659402018995-CarImages"
import { CreateRentals1659488853705 } from "./1659488853705-CreateRentals"

export const migrations = [
    CreateCategories1654826967781,
    migrations1657165082853,
    User1657602031073,
    AlterUserDeleteUserName1657774263727,
    AlterUserAddAvatar1658376169074,
    CreateCars1658791215491,
    CreateSpecificationCars1659206068902,
    CarImages1659402018995,
    CreateRentals1659488853705
]
