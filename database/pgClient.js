const { Client } = require('pg')

const connectionString = "postgres://zcyjtpnt:v9WrgFEIVCryDxRnFn2s5xrZpXuqhEvG@mel.db.elephantsql.com/zcyjtpnt";

const pgClient = new Client({
  connectionString: connectionString
});

// const pgClient = new Client({
//   user: 'postgres', 
//   password: 'password', 
//   host: 'localhost', 
//   database: 'digobr', 
//   port: 5432, 
// })

pgClient.connect((err) => {
  if (err) {
    console.error('Pg client connection error', err.stack)
  } else {
    console.log('Pg client connected')
  }
})

module.exports = pgClient;