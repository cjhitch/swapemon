// import express router
const router = require('express').Router();
// import the pokeballs router
const pokeCtrl = require('../controllers/pokeballs.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /pokeballs
router.get('/', pokeCtrl.getPokeballs);
// GET /pokeballs/:id
router.get('/:id', pokeCtrl.getOneById);
// export the routes from this file
module.exports = router;
