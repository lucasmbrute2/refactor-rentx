import { AppError } from "@shared/errors/AppError";
import { ICreateSpecificationDTO, ISpecificationRepository } from "@modules/cars/repositories/ISpecificationReposity";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private categoriesRepository: ISpecificationRepository) { }


    async execute({ name, description }: ICreateSpecificationDTO) {
        const specification = await this.categoriesRepository.findByName(name)
        if (specification) throw new AppError("Specification already exists")

        await this.categoriesRepository.create({ name, description })
    }
}