const http = require('http');
const app = require('./app');
const {sequelize} = require('./api/models')
const server = http.createServer(app);
const config = require('./config/config')

sequelize.sync().then(() => {
	server.listen(config.port);
	console.log(`Server started on port ${config.port}`)
})
