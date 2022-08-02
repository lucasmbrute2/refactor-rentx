import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/ListCars/ListCarsController";
import { UploadCarController } from "@modules/cars/useCases/UploadCarImage/UploadCarImageController";
import { Router } from "express"
import multer from "multer";
import uploadConfig from "@configs/uploads/upload"
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
const carsRouter = Router();

const createCarController = new CreateCarController()
const listAvailableControler = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarController()

const upload = multer(uploadConfig.upload("./temp/cars"))

carsRouter.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRouter.get("/available", listAvailableControler.handle)
carsRouter.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRouter.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle)
export { carsRouter }