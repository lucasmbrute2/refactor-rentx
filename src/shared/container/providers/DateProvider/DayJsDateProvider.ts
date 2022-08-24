import { IDateProvider } from "./IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

export class DayJsDateProvider implements IDateProvider {
    dateNow(): Date {
        return dayjs().toDate()
    }

    convertToUTC(date: Date): String {
        return dayjs(date).utc().local().format()
    }

    compareInHours(start_date: Date, end_date: Date): Number {
        const end_date_utc = this.convertToUTC(end_date)
        const start_date_utc = this.convertToUTC(start_date)
        //@ts-ignore
        return dayjs(end_date_utc).diff(start_date_utc, "hours")
    }

    dateAfter24Hours(): Date {
        return dayjs().add(1, "day").toDate();
    }

}