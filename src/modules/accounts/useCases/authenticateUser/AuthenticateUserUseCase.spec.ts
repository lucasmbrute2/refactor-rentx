import "reflect-metadata";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;


describe("Auth user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("should be enable to authenticate a user", async () => {

        const user = {
            driver_license: "0310310",
            email: "user@test.com",
            name: "user@test.com",
            password: "1234",
            id: 1234
        }

        await createUserUseCase.execute(user);

        const token = await authUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        expect(token).toHaveProperty("token")
    })

    it("should not be able to auth an non existent user", () => {
        expect(async () => {
            await authUserUseCase.execute({
                email: "tes13131t@email.com",
                password: "test password"
            });
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to auth a user with incorrect password", () => {
        expect(async () => {
            const user = {
                driver_license: "9999",
                email: "usera@test.com",
                name: "usera@test.com",
                password: "12346",
                id: 12344
            }

            await createUserUseCase.execute(user);
            await authUserUseCase.execute({
                email: user.email,
                password: "wrong password"
            });
        }).rejects.toBeInstanceOf(AppError)
    })
})