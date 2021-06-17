import db from '../models/index.js';

class UserService {
    async getAllUsers() {
        try {
            return await db.User.findAll();
        } catch(err){
            throw err;
        }
    }

    async addUser(newUser) {
        try {
            return await db.User.create(newUser);
        } catch(err) {
            throw err;
        }
    }

    async updateUser(id, updateUser) {
        try {
            const user = await db.User.findOne({
                where: { id: Number(id) }
            });

            if (user) {
                await db.User.update(updateUser, {where: {  id: Number(id)} });

                return updateUser;
            }
            return null;
        } catch(err) {
            throw err;
        }
    }

    async getUser(id) {
        try {
          const user = await db.User.findOne({
            where: { id: Number(id) }
          });
    
          return user;
        } catch (err) {
          throw err;
        }
    }

    async deleteUser(id) {
        try {
          const user = await db.User.findOne({ where: { id: Number(id) } });
    
          if (user) {
            const deletedUser = await db.User.destroy({
              where: { id: Number(id) }
            });
            return deletedUser;
          }
          return null;
        } catch (err) {
          throw err;
        }
    }
}

export default UserService;