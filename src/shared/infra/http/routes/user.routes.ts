import { Router } from "express"
import multer from "multer";
const userRouter = Router();
import uploadConfig from "@configs/uploads/upload"
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController"
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

const createUserController = new CreateUserController();
const updateAvatarUserController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(uploadConfig)

userRouter.post("/", createUserController.handle)
userRouter.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateAvatarUserController.handle)
userRouter.get("/", ensureAuthenticated, profileUserController.handle)

export { userRouter }