import { injectable } from "tsyringe";
import { createTestAccount, createTransport, getTestMessageUrl, Transporter } from "nodemailer"
import { AppError } from "@shared/errors/AppError";
import { MailProvider } from "./MailProvider";

@injectable()
export class EtherealMailProvider extends MailProvider {
    constructor() {
        super()
        createTestAccount().then((account) => {
            this.client = createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })
        }).catch(err => {
            throw new AppError("Transporter not found. Error:", err)
        })
    }
}