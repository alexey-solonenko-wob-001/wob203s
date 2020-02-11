import express from 'express';
import { insertUser } from '../../routeHandlers/users/insert-user.js';
const usersMiniApp = express.Router();

usersMiniApp.use('/insert-user', insertUser);

export { usersMiniApp };