import { Category } from "../../entities/Category";
import { ICategoriesDTO, ICategoriesRepository } from "../ICategoriesRepository";
import { AppDataSource } from "../../../../database/data-source"
import { Repository } from "typeorm";

export class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async createCategory({ name, description }: ICategoriesDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description
        })

        await this.repository.save(category)
    }

    async findByName(name: string): Promise<Category | null> {
        const category = await this.repository.findOneBy({ name })
        return category
    }

}
