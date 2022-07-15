import dotenv from "dotenv"
dotenv.config();

export default {
    database: {
        databaseName: process.env.DB ?? "postgres",
        databaseUsername: process.env.DB_USERNAME ?? "postgres",
        databasePassword: process.env.DB_PASSWORD ?? "postgres"
    },
    token: {
        md5Hash: process.env.MD5HASH_JSON_TOKEN ?? 'sounds'
    }
}