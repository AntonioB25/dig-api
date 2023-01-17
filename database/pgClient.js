const { Client } = require('pg')
 
const pgClient = new Client({
  user: 'postgres', 
  password: 'password', 
  host: 'localhost', 
  database: 'digobr', 
  port: 5432, 
})

pgClient.connect((err) => {
  if (err) {
    console.error('Pg client connection error', err.stack)
  } else {
    console.log('Pg client connected')
  }
})

module.exports = pgClient;