import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationReposity";

export class SpecificationRepositoryInMemory implements ISpecificationRepository {
    specifications: Specification[] = []

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        })

        await this.specifications.push(specification)

        return specification;
    }

    async findByName(name: string): Promise<Falsy | Specification> {
        return await this.specifications.find(spec => spec.name === name)
    }

    async findByIds(ids: string[]): Promise<Falsy | Specification[]> {
        return await this.specifications.filter(spec => ids.includes(spec.id as string))
    }

}