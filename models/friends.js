const { builtinModules } = require('module');
const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')


const friendsSchema = mongoose.Schema({
  friendCount: {type: Number},
})

const friends = mongoose.model('friends', friendsSchema)


module.exports = friends;