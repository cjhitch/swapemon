// load imports
const error = require('debug')('api:error');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const morganDebug = require('morgan-debug');
const cors = require('cors');
// routes
const pokemonRouter = require('./routes/pokemon.routes');
const pokeballsRouter = require('./routes/pokeballs.routes');
const movesRouter = require('./routes/moves.routes');
const conversationsRouter = require('./routes/conversations.routes');
const usermonsRouter = require('./routes/usermons.routes');
const usersRouter = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const msgRoutes = require('./routes/messages.routes');

// create express app
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// check content type parse to req.body
app.use(express.json());
// log all requests
app.use(morganDebug('api:request', 'dev'));
// pokemon route
app.use('/pokemon', pokemonRouter);
// pokeballs route
app.use('/pokeballs', pokeballsRouter);
// moves route
app.use('/moves', movesRouter);
// conversations route
app.use('/conversations', conversationsRouter);
// usermons route
app.use('/usermons', usermonsRouter);
// users route
app.use('/users', usersRouter);
// login route
app.use('/auth', authRoutes);
// message route
app.use('/messages', msgRoutes);

// API calls
app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
	console.log(req.body);
	res.send(
		`I received your POST request. This is what you sent me: ${req.body.post}`
	);
});

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, '../reactjs/build')));

	// Handle React routing, return all requests to React app
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'));
	});
}
// eslint-disable-next-line
app.use((err, req, res, next) => {
	error('ERROR FOUND: ', err);
	res.sendStatus(500);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
