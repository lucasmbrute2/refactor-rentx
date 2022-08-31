export interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): Number
    convertToUTC(date: Date): String
    dateNow(): Date;
    dateAfter24Hours(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
}