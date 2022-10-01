const mongoose = require('mongoose')

const User = require("../models/users")

function seedUsers() {

const multiUser = [{name: 'John Smith', username: 'Jsmith2022', email: 'jtsmith@gmail.com', password: 'smartPass12' }, {name: 'Salley Thompson', username: 'sThompson2022', email: 'salleyThompson@gmail.com', password: 'GreatPassword12' }, {name: 'Tony Ballisteri', username: 'TonyB17', email: 'TonyB2Fast@gmail.com', password: 'TonyBGood' }]

const newUser = User.collection.insert(multiUser, (err, result) => {
  if(err) {console.log(err)  }
  else { console.log('new User data seeded successfully.')}

}) 
}

module.exports = seedUsers;