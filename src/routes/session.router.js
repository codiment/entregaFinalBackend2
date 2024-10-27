import { Router } from "express";
const router = Router()
import passport from "passport";
import UserController from "../controllers/user.controller.js";
const userController = new UserController();

//Metodo post para registrar un usuario.
router.post("/register", userController.register)
//Metodo post para iniciar sesion de un usuario.
router.post("/login", userController.login)
//Metodo get con estrategia current.
router.get("/current", passport.authenticate("current", {session: false}), userController.current)
//Metodo logout para quitar la sesion del usuario.
router.post("/logout", userController.logout)



export default router