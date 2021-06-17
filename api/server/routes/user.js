import { Router } from 'express';
import UserController from '../controllers/Users.js';
const router = Router();

router.get('/', async() => {
    await UserController.getAllUsers});
router.post('/', async() => { await UserController.addUser});
router.get('/:id', async() => { await UserController.getUser});
router.put('/:id', async() => { await UserController.updateUser});
router.delete('/:id', async() => { await UserController.deleteUser});

export default router;