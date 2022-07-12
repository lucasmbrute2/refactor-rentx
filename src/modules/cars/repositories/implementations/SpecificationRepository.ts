import { Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { AppDataSource } from "../../../../database/data-source"
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationReposity";

export class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = AppDataSource.getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({ name, description })
        await this.repository.save(specification)
    }

    async findByName(name: string): Promise<Specification | null> {
        const specification = await this.repository.findOneBy({ name })
        return specification;
    }

}