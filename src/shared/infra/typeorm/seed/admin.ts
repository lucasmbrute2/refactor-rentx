import { AppDataSource, createConnection } from "../data-source";
import { hash } from "bcrypt"
import config from "@configs/dotenvEntries/index"

async function create() {
    await createConnection()
    const id = Math.floor(Math.random() * 300)
    const password = await hash(config.password, 8)

    await AppDataSource.query(`
    INSERT INTO USERS( id, name, email, password, "isAdmin", created_at, driver_license )
    values('${id}','admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXX' )
    `)

    await AppDataSource.destroy()
}

create().then(() => console.log("User admin created"))