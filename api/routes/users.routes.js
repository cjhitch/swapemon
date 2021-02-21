// import express router
const router = require('express').Router();
// import the users router
const usersCtrl = require('../controllers/auth.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /users
// router.get('/', usersCtrl.getUsers);
// GET /users/:id
// router.get('/:id', usersCtrl.getOneById);
// POST /users
router.post('/', protectedRoute, usersCtrl.createUser);
// PUT /users/:id
// router.put('/:id', protectedRoute, usersCtrl.updateUser);
// DELETE /users/:id
// router.delete('/:id', protectedRoute, usersCtrl.removeUser);
// export the routes from this file
module.exports = router;
