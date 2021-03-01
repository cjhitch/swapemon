// import express router
const router = require('express').Router();
// import the conversation controller
const msgCtrl = require('../controllers/messages.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// POST /messages
router.post('/', protectedRoute, msgCtrl.createMessage);
// PUT /messages/:id
router.put('/:id', protectedRoute, msgCtrl.updateMessage);
// DELETE /messages/:id
router.delete('/:id', protectedRoute, msgCtrl.removeMessage);
// export the route
module.exports = router;
