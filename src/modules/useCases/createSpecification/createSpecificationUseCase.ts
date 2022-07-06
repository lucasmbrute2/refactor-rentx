import { ICreateSpecificationDTO, ISpecificationRepository } from "../../repositories/ISpecificationReposity";

export class CreateSpecificationUseCase {
    constructor(private categoriesRepository: ISpecificationRepository) { }

    async execute({ name, description }: ICreateSpecificationDTO) {
        const specification = await this.categoriesRepository.findByName(name)
        if (specification) throw "Specification already exists"

        await this.categoriesRepository.create({ name, description })
    }
}