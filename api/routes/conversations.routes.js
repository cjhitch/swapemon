// import express router
const router = require('express').Router();
// import the conversation controller
const conversationCtrl = require('../controllers/conversations.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /conversations?userId=____ route
router.get('/', conversationCtrl.getConversations);
// GET /conversations/:id
router.get('/:id', conversationCtrl.getOneById);
// POST /conversations
router.post('/', protectedRoute, conversationCtrl.createConversation);
// PUT /conversations/:id
router.put('/:id', protectedRoute, conversationCtrl.updateConversation);
// DELETE /conversations/:id
router.delete('/:id', protectedRoute, conversationCtrl.removeConversation);
// export the route
module.exports = router;
