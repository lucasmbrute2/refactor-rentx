import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoriesDTO {
    name: string;
    description: string;
}

export interface ICategoriesRepository {
    findByName(name: string): Promise<Category | Falsy>
    list(): Promise<Category[]>
    createCategory({ name, description }: ICategoriesDTO): Promise<void>
}