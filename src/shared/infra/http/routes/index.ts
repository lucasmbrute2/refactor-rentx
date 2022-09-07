import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { carsRouter } from "./cars.routes";
import { categoriesRouter } from "./categories.routes"
import { passwordRoutes } from "./password.routes";
import { rentalRouter } from "./rental.routes";
import { specificationRouter } from "./specification.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/categories", categoriesRouter)
router.use("/specifications", specificationRouter)
router.use("/user", userRouter)
router.use("/car", carsRouter)
router.use("/rentals", rentalRouter)
router.use(authenticateRouter)
router.use("/password", passwordRoutes)

export { router }