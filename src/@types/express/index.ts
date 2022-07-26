declare namespace Express {
    export interface Request {
        user: {
            id: string;
        }
    }
}

type Falsy = false | 0 | "" | null | undefined 