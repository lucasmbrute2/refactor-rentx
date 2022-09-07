import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import { createTestAccount, createTransport, getTestMessageUrl, Transporter } from "nodemailer"
import { AppError } from "@shared/errors/AppError";

@injectable()
export class EtherealMailProvider implements IMailProvider {
    private client: Transporter | Falsy;

    constructor() {
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

    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const message = {
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            text: body,
            html: body
        }

        //@ts-ignore
        this.client.sendMail(message, (err, info) => {
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', getTestMessageUrl(info));
        })
    }

}