import express from 'express';
import UsersController from './constrollers/UsersController';
import SessionsController from './constrollers/SessionsController';

const routes = express.Router();

const usersController = new UsersController();
const sessionsController = new SessionsController();

routes.post('/users', usersController.create);
routes.post('/forgot', usersController.forgot);
routes.post('/sessions', sessionsController.create);

export default routes;