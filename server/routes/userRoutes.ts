import express from 'express';
import * as controller from '../controller/userController';
const router = express.Router();

router.post('/register', controller.createUser);
router.post('/user/login',controller.login);
router.post('/user/logout',controller.logout)
export default router