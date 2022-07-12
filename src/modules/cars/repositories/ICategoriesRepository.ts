import { Category } from "../entities/Category";

export interface ICategoriesDTO {
    name: string;
    description: string;
}

export interface ICategoriesRepository {
    findByName(name: string): Promise<Category | null>
    list(): Promise<Category[]>
    createCategory({ name, description }: ICategoriesDTO): Promise<void>
}