// Importamos el UserDao.

import UserDao from "../dao/user.dao.js";

class UserRepository {
    async createUser(userData) {
        return await UserDao.save(userData);
    }

    async getUserById(id){
        return await UserDao.findById(id);
    }

    async getUserByEmail(email){
        return await UserDao.findOne({email});
    }

    async updateUserById(id,userData){
        return await UserDao.update(id,userData);
    }

    async deleteUserById(id){
        return await UserDao.delete(id);
    }


}
// lo importamos ya instanciado
export default new UserRepository();