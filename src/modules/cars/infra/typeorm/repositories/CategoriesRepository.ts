import { ICategoriesDTO, ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"
import { Repository } from "typeorm";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

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

    async findByName(name: string): Promise<Category | void> {
        const category = await this.repository.findOneBy({ name })
        if (!category) return
    }

}
