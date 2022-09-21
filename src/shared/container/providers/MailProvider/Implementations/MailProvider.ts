import { getTestMessageUrl, Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import fs from "fs";
import Handlebars from "handlebars";

@injectable()
export class MailProvider implements IMailProvider {
    public client: Transporter | Falsy;

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8")
        const templateParse = Handlebars.compile(templateFileContent)

        const templateHMTL = templateParse(variables)

        const message = {
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            html: templateHMTL
        }

        //@ts-ignore
        this.client.sendMail(message, (err, info) => {
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', getTestMessageUrl(info));
        })
    }
}