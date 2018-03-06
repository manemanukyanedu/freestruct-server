module.exports = {
	port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'freestruct1',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '0mercury0',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost',
      pool: {
        max: 9,
        min: 0,
        idle: 10000
      }
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'fssecretenc'
  }
}
