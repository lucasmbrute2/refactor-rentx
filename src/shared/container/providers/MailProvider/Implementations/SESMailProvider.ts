import { injectable } from "tsyringe";
import aws from "aws-sdk";
import nodemailer, { getTestMessageUrl, Transporter } from "nodemailer";
import { MailProvider } from "./MailProvider";

@injectable()
export class SESMailProvider extends MailProvider {
    constructor() {
        super()
        const ses = new aws.SES({
            apiVersion: "2010-12-01",
            region: process.env.AWS_BUCKET_REGION,
        })

        this.client = nodemailer.createTransport({
            SES: {
                ses,
                aws
            }
        })
    }
}