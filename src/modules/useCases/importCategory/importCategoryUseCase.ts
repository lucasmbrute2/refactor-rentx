import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import fs from "fs"
import { parse } from "csv-parse";

interface IImportCategory {
    name: string;
    description: string;
}

export class importCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
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


}