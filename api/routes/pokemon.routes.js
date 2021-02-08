// import express router
const router = require('express').Router();
// import the pokemon router
const pokeCtrl = require('../controllers/pokemon.controller');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /pokemon
router.get('/', pokeCtrl.getPokemon);
// GET /pokemon/:id
router.get('/:id', pokemonCtrl.getOneById);
// POST /pokemons
router.post('/', protectedRoute, pokemonCtrl.createPokemon);
// PUT /pokemons/:id
router.put('/:id', protectedRoute, pokemonCtrl.updatePokemon);
// DELETE /pokemons/:id
router.delete('/:id', protectedRoute, pokemonCtrl.removePokemon);
// export the routes from this file
module.exports = router;
