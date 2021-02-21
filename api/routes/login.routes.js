// import express router
const router = require('express').Router();
// import the users router
const authCtrl = require('../controllers/auth.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /users
router.get('/', authCtrl.getUsers);
// GET /users/:id
router.get('/:id', authCtrl.getOneById);
// POST /users
router.post('/', protectedRoute, authCtrl.createUser);
// PUT /users/:id
// router.put('/:id', protectedRoute, authCtrl.updateUser);
// DELETE /users/:id
// router.delete('/:id', protectedRoute, authCtrl.removeUser);
// export the routes from this file
module.exports = router;
