import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./createSpecificationController";
import { CreateSpecificationUseCase, } from "./createSpecificationUseCase";


const specificationRepository = new SpecificationRepository()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)
export const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)