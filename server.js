const express = require('express');
const db = require('./config/connection');
const seedThoughts = require('./seeds/seedThoughts')

const routes = require('./routes')

const seedUsers = require('./seeds/seedUser')


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(routes);


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}!`);
  })
})