import { Router } from "express";
const authenticateRouter = Router();
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController"
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRouter.post("/sessions", authenticateUserController.handle)
authenticateRouter.post("/refresh-token", refreshTokenController.handle)

export { authenticateRouter }