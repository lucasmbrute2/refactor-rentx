import { app } from "@shared/infra/http/app"
import { clearDB, create } from "@shared/infra/typeorm/seed/admin"
import request from "supertest"
import config from "@configs/dotenvEntries"

describe("Create Category Controller", () => {
    beforeEach(async () => {
        await clearDB()
        await create()
    })

    it("should be able to create a new category", async () => {
        const { body: { token } } = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: config.password
        })

        const response = await request(app).post("/categories").send({
            name: "sedan TEST2",
            description: "Carro alogando e baixo TEST2"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201)
    })

    it("should not be able to create a new category with existent name", async () => {
        const { body: { token } } = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: config.password
        })

        await request(app).post("/categories").send({
            name: "sedan TEST 3",
            description: "Carro alogando e baixo TEST 3"
        }).set({
            Authorization: `Bearer ${token}`
        })
        const response = await request(app).post("/categories").send({
            name: "sedan TEST 3",
            description: "Carro alogando e baixo TEST 3"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(400)
    })
})