import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import fs from "fs"
import { parse } from "csv-parse";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
export class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) { }

    private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            const stream = fs.createReadStream(file.path)
            const parseFile = parse()

            stream.pipe(parseFile)

            parseFile.on("data", line => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                })
            });

            parseFile.on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", err => {
                reject(err)
            })

        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.forEach(async category => {
            const { name, description } = category;
            const existedCategory = await this.categoriesRepository.findByName(name)

            if (!existedCategory) {
                this.categoriesRepository.createCategory({
                    name,
                    description
                })
            }
        })

    }
}