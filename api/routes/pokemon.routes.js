// import express router
const router = require('express').Router();
// import the pokemon router
const pokeCtrl = require('../controllers/pokemon.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /pokemon
router.get('/', pokeCtrl.getPokemon);
// GET /pokemon/:id
router.get('/:id', pokeCtrl.getOneById);
// POST /pokemons
router.post('/', protectedRoute, pokeCtrl.createPokemon);
// PUT /pokemons/:id
router.put('/:id', protectedRoute, pokeCtrl.updatePokemon);
// DELETE /pokemons/:id
router.delete('/:id', protectedRoute, pokeCtrl.removePokemon);
// export the routes from this file
module.exports = router;
