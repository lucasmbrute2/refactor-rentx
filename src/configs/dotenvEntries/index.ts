import dotenv from "dotenv"
dotenv.config();

export default {
    database: {
        databaseName: process.env.DB ?? "postgres",
        databasePassword: process.env.DB_PASSWORD ?? "postgres",
        databaseUsername: process.env.DB_USERNAME ?? "postgres"
    },
    token: {
        md5Hash: process.env.MD5HASH_JSON_TOKEN ?? 'sounds'
    }
}