const { builtinModules } = require('module');
const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')


const friendsSchema = mongoose.Schema({
  username: {type: String},
  email: {type: String},
  name: {type: String}
})

const friends = mongoose.model('friends', friendsSchema)


module.exports = friends, friendsSchema