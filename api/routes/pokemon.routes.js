// import express router
const router = require('express').Router();
// import the pokemon router
const pokeCtrl = require('../controllers/pokemon.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /pokemon
router.get('/', pokeCtrl.getPokemon);
// export the routes from this file
module.exports = router;
