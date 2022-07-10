import { inject, injectable } from "tsyringe";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../repositories/ISpecificationReposity";

@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private categoriesRepository: ISpecificationRepository) { }


    async execute({ name, description }: ICreateSpecificationDTO) {
        const specification = await this.categoriesRepository.findByName(name)
        if (specification) throw "Specification already exists"

        await this.categoriesRepository.create({ name, description })
    }
}