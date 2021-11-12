// import express router
const router = require('express').Router();
// import the moves router
const moveCtrl = require('../controllers/moves.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /moves
router.get('/', moveCtrl.getMoves);
// GET /moves/:id
router.get('/:id', moveCtrl.getOneById);
// POST /moves
router.post('/', protectedRoute, moveCtrl.createMove);
// PUT /moves/:id
router.put('/:id', protectedRoute, moveCtrl.updateMove);
// DELETE /moves/:id
router.delete('/:id', protectedRoute, moveCtrl.removeMove);
// export the routes from this file
module.exports = router;
