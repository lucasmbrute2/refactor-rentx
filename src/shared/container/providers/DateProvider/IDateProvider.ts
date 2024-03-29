export interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): Number
    convertToUTC(date: Date): String
    dateNow(): Date;
    dateAfter24Hours(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfIsBefore(start_date: Date, end_date: Date): boolean
}