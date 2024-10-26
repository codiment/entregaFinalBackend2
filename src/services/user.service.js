import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/utils.js";

class UserServices {

    async registerUser(userData) {
        try {
            const existingUser = await userRepository.getUserByEmail(userData.email);
            if (existingUser) throw new Error("El usuario ya existe");

            userData.password = createHash(userData.password);
            return await userRepository.createUser(userData);
            
        } catch (error) {
            throw new Error("Error al registrar un perfil nuevo: " + error.message);
        }
    };

    async loginUser(email, password) {
        try {
            const user = await userRepository.getUserByEmail(email);
            if (!user) throw new Error("Usuario no encontrado");

            const validPassword = isValidPassword(password, user.password);
            if (!validPassword) throw new Error("Credenciales incorrectas");

            return user;
        } catch (error) {
            throw new Error("Error al iniciar sesión: " + error.message);
        }
    }

    async getUserById(id) {
        try {
            const user = await userRepository.getUserByEmail(id);
            return user;
        } catch (error) {
            throw new Error("No se pudo obtener el usuario: " + error.message);
        }
    }
}

export default new UserServices();