// import express router
const router = require('express').Router();
// import the users router
const authCtrl = require('../controllers/auth.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// // POST /users
router.post('/', protectedRoute, authCtrl.formLogin);
// GET auth/forgot_password
router.get('/forgot_password', authCtrl.render_forgot_password_template);
// POST auth/forgot_password
router.post('/forgot_password', authCtrl.forgot_password);
// export the routes from this file
module.exports = router;
