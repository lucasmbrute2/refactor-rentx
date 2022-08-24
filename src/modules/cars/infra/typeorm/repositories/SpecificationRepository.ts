import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationReposity";

export class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = AppDataSource.getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({ name, description })
        return await this.repository.save(specification)
    }

    async findByName(name: string): Promise<Specification | Falsy> {
        return await this.repository.findOneBy({ name })

    }

    async findByIds(ids: number[]): Promise<Falsy | Specification[]> {
        return await this.repository.findBy({
            id: In(ids)
        })
    }

}