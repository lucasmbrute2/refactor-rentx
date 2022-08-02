import { AppDataSource, createConnection } from "../data-source";
import { hash } from "bcrypt"
import config from "@configs/dotenvEntries/index"
import { v4 as uuid } from "uuid"

async function create() {
    await createConnection()
    const password = await hash(config.password, 8)

    await AppDataSource.query(`
    INSERT INTO USERS( id, name, email, password, "isAdmin", created_at, driver_license )
    values('${uuid()}','admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXX' )
    `)

    await AppDataSource.destroy()
}

create().then(() => console.log("User admin created"))