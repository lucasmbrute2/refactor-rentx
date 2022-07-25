import { Router } from "express"
import multer from "multer";
const userRouter = Router();
import uploadConfig from "../../../../configs/uploads/upload"
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController"
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const createUserController = new CreateUserController();
const updateAvatarUserController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload("./temp/avatar"))

userRouter.post("/", createUserController.handle)
userRouter.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateAvatarUserController.handle)

export { userRouter }