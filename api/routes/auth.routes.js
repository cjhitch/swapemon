// import express router
const router = require('express').Router();
// import the users router
const authCtrl = require('../controllers/auth.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// POST /auth
router.post('/', protectedRoute, authCtrl.formLogin);
// POST auth/forgot_password
router.post('/forgot_password', authCtrl.forgot_password);
// POST auth/reset_password
router.post('/reset_password', authCtrl.reset_password);
// POST auth/contact
router.post('/contact', authCtrl.contactForm);
// export the routes from this file
module.exports = router;
