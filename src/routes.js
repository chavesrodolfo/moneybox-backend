const express = require('express');
const UserController = require('./controllers/UserController');
const TargetController = require('./controllers/TargetController');
const ProfileController = require('./controllers/ProfileController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();

routes.use(express.json());

routes.post('/login', LoginController.login);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/targets', TargetController.index);
routes.post('/targets', TargetController.create);
routes.delete('/targets/:id', TargetController.delete);
routes.put('/targets/:id', TargetController.update);

routes.get('/profile', ProfileController.index);

module.exports = routes;