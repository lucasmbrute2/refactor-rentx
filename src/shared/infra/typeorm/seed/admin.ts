import { AppDataSource, createConnection } from "../data-source";
import { hash } from "bcrypt"
import config from "@configs/dotenvEntries/index"

export async function create() {
    await createConnection()
    const password = await hash(config.password, 8)

    await AppDataSource.query(`
    INSERT INTO USERS( id, name, email, password, "isAdmin", created_at, driver_license )
    VALUES('${Math.trunc(Math.random() * 100000)}','admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXX' )
    `)

    if (process.env.NODE_ENV === 'test') return
    await AppDataSource.destroy()
}

create().then(() => console.log("User admin created"))