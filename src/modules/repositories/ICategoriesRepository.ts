import { Category } from "../entities/Category";

export interface ICategoriesRepository {
    findByName: (name: string) => Promise<Category>;
}