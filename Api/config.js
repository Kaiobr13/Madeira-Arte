const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER=process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'Passw0rd'
const DB_NAME = process.env.DB_NAME || 'new_schema'


const config = {
    db: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectTimeout: 60000
    },
    listPerPage: 10,
    secret: 'Passw0rd' 

  };
  module.exports = config;
  