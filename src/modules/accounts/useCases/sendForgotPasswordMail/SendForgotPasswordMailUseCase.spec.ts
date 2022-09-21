import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayJsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayJsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayJsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    })

    it("should be able to send a forgot email to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail")

        await usersRepositoryInMemory.create({
            driver_license: "driver license TEST",
            email: "email TEST",
            name: "name TEST",
            password: "123467",
            avatar: null,
            avatar_url: () => "avatar"

        })

        await sendForgotPasswordMailUseCase.execute("email TEST");

        expect(sendMail).toHaveBeenCalled();
    })
})