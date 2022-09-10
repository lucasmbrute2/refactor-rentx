import { clearDB, create } from "@shared/infra/typeorm/seed/admin"
import request from "supertest"
import config from "@configs/dotenvEntries"
import { app } from "@shared/infra/http/app"

describe("List Category", () => {
    beforeEach(async () => {
        await clearDB()
        await create()
    })

    it("should be able to list all categories", async () => {
        const { body: { refresh_token } } = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: config.password
        })

        await request(app).post("/categories").send({
            name: "sedan TEST4",
            description: "Carro alogando e baixo TEST4"
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })

        const response = await request(app).get("/categories")

        expect(response.status).toBe(200)
    })
})