import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/typeorm/data-source"
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationReposity";

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