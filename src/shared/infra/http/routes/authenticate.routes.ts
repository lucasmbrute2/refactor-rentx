import { Router } from "express";
const authenticateRouter = Router();
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController"

const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post("/sessions", authenticateUserController.handle)

export { authenticateRouter }