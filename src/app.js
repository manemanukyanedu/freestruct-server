const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const toolsRoutes = require('./api/routes/dashboard/tool')
const quizzesRoutes = require('./api/routes/quiz/quizzes')
const questionRoutes = require('./api/routes/quiz/question')
const registerRoutes = require('./api/routes/accounts/register')
const loginRoutes = require('./api/routes/accounts/login')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
		return res.status(200).json({});
	}
	next();
})

// Routes which should handle requests
app.use('/dashboardTool', toolsRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/question', questionRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

// Route doesn't exist
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
});

module.exports = app;