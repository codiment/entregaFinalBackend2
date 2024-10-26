import userService from "../services/user.service.js";
import jwt from "jsonwebtoken"
import UserDto from "../dto/user.dto.js";
import cartService from "../services/cart.service.js";


class UserController {

    async register(req, res) {

        const { first_name, last_name, email, age, password } = req.body;

        try {

            //Creamos el carrito para asociarlo al schema de usuario
            const newCart = await cartService.create();

            const newUser = await userService.registerUser({
                first_name, last_name, email, age, cart: newCart._id ,password
            });

            const token = jwt.sign({ usuario: `${newUser.first_name} ${newUser.last_name}`, email: newUser.email, role: newUser.role }, "coderhouse", { expiresIn: "1h" });

            res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true  });

            res.redirect("/api/sessions/current");
            
        } catch (error) {

            res.status(500).send("Error al registrar usuario")
            
        };

    };

    async login(req, res) {
        const { email, password } = req.body;
    
        try {
            const user = await userService.loginUser(email, password);
            if (!user) {
                return res.status(401).send({ error: "Credenciales incorrectas" });
            }
    
            const token = jwt.sign(
                { usuario: `${user.first_name} ${user.last_name}`, email: user.email, role: user.role },
                "coderhouse",
                { expiresIn: "1h" }
            );
    
            res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true });
            res.redirect("/api/sessions/current");
        } catch (error) {
            console.error("Error en login:", error); // Agregar un log para mayor detalle
            res.status(500).send({ error: "Error al iniciar sesión" });
        }
    }

    async current(req, res) {

        if(req.user) {

            const user = req.user;
            const userDTO = new UserDto(user);
            res.render("profile", {user: userDTO, email: user.email, role: user.role})

        }else {
            res.send("No autorizado")
        }

    }

    async logout(req, res) {

        res.clearCookie("coderCookieToken")
        res.redirect("/login")

    }

};

export default UserController;