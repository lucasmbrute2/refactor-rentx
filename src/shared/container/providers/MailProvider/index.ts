import { container } from "tsyringe"
import { IMailProvider } from "./IMailProvider"
import { EtherealMailProvider } from "./Implementations/EtherealMailProvider"
import { SESMailProvider } from "./Implementations/SESMailProvider"

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
    "MailProvider",
    //@ts-ignore 
    mailProvider[process.env.MAIL_PROVIDER]
)