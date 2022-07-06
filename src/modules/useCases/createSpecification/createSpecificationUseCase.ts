import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { ICreateSpecificationDTO } from "../../repositories/ISpecificationReposity";

export class createSpecificationUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    async execute({ name, description }: ICreateSpecificationDTO) {
        const specification = await this.categoriesRepository.findByName(name)
        if (specification) throw "Specification already exists"

        await this.categoriesRepository.createCategory({ name, description })
    }
}