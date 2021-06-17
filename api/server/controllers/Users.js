import UserService from '../services/user.js';
import Util from '../utils/Utils.js';

const util = new Util();

class UserController {
   async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      if (allUsers.length > 0) {
        util.setSuccess(200, 'Users retrieved', allBooks);
      } else {
        util.setSuccess(200, 'No user found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

   async addUser(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newUser = req.body;
    try {
      const user = await UserService.addUser(newUser);
      util.setSuccess(201, 'User Added!', user);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

   async updateUser(req, res) {
    const alteredUser = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const user = await UserService.updateUser(id, alteredUser);
      if (!user) {
        util.setError(404, `Cannot find book with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Book updated', user);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

   async getUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const user = await UserService.getUser(id);

      if (!user) {
        util.setError(404, `Cannot find user with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found User', user);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

   async deleteUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const user = await UserService.deleteUser(id);

      if (user) {
        util.setSuccess(200, 'User deleted');
      } else {
        util.setError(404, `User with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}
export default UserController;