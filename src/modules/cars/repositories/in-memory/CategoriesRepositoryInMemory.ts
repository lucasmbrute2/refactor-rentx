import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesDTO, ICategoriesRepository } from "../ICategoriesRepository";
import { v4 as uuid } from "uuid"

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
        const id = uuid();

        Object.assign(category, {
            id,
            name,
            description,
            created_at: Date.now()
        })

        this.categories.push(category);
    }

}