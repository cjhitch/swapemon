// import express router
const router = require('express').Router();
// import the usermon controller
const usermonCtrl = require('../controllers/usermons.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /usermons?username=____ route
router.get('/', usermonCtrl.getUserUsermons);
// GET /usermons/:id
router.get('/:id', usermonCtrl.getOneById);
// POST /usermons
router.post('/', protectedRoute, usermonCtrl.createUsermon);
// PUT /usermons/:id
router.put('/:id', protectedRoute, usermonCtrl.updateUsermon);
// DELETE /usermons/:id
router.delete('/:id', protectedRoute, usermonCtrl.removeUsermon);
// export the route
module.exports = router;
