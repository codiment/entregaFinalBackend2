import { Router } from "express";
const router = Router()
import passport from "passport";
import UserController from "../controllers/user.controller.js";
const userController = new UserController();


router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/current", passport.authenticate("current", {session: false}), userController.current)
router.post("/logout", userController.logout)



export default router