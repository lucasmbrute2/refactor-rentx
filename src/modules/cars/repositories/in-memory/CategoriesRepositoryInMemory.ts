import { randomUUID } from "crypto";
import { Category } from "../../entities/Category";
import { ICategoriesDTO, ICategoriesRepository } from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = [];

    async findByName(name: string) {
        const category = this.categories.find(category => category.name === name);
        return category;
    }

    async list(): Promise<Category[]> {
        return this.categories
    }

    async createCategory({ name, description }: ICategoriesDTO): Promise<void> {
        const category = new Category();
        const id = Math.floor(Math.random() * Number(Date.now()))

        Object.assign(category, {
            id,
            name,
            description,
            created_at: Date.now()
        })

        this.categories.push(category);
    }

}