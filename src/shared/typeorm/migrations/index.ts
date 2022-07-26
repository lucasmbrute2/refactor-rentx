import { migrations1657165082853 } from "./1657165082853-migrations"
import { CreateCategories1654826967781 } from "./1656986536350-migrations"
import { User1657602031073 } from "./1657602031073-User"
import { AlterUserDeleteUserName1657774263727 } from "./1657774263727-AlterUserDeleteUserName"
import { AlterUserAddAvatar1658376169074 } from "./1658376169074-AlterUserAddAvatar"

export const migrations = [
    CreateCategories1654826967781,
    migrations1657165082853,
    User1657602031073,
    AlterUserDeleteUserName1657774263727,
    AlterUserAddAvatar1658376169074
]