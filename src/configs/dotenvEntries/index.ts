import dotenv from "dotenv"
dotenv.config();

export default {
    database: {
        databaseName: process.env.DB ?? "postgres",
        databaseNameTEST: process.env.DB_TEST ?? "rentx_test",
        databaseUsername: process.env.DB_USERNAME ?? "postgres",
        databasePassword: process.env.DB_PASSWORD ?? "postgres"
    },
    token: {
        md5Hash: process.env.MD5HASH_JSON_TOKEN ?? 'sounds',
        expires_in_token: "15m",
        refresh_token_key: process.env.REFRESH_TOKEN_KEY as string,
        expires_in_refresh_token: "30d" as string
    },
    password: process.env.ADMIN_PASSWORD ?? "admin",
    forgotUrl: process.env.FORGOT_MAIL_URL,
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    sentry: {
        dsn: process.env.SENTRY_DSN
    }
}