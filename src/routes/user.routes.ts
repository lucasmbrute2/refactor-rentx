import { Router } from "express"
const userRouter = Router();
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController"

const createUserController = new CreateUserController();

userRouter.post("/", createUserController.handle)

export { userRouter }