import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import { createTestAccount, createTransport, getTestMessageUrl, Transporter } from "nodemailer"
import SMTPConnection from "nodemailer/lib/smtp-connection";


@injectable()
export class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

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
        }).catch(err => console.error(err))

    }

    sendMail(to: string, subject: string, body: string): Promise<void> {
        const message = {
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            text: body,
            html: body
        }

        this.client.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', getTestMessageUrl(info));
        })
    }

}