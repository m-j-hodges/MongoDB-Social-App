const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');
const thoughtsSchema = require('./thoughts')
const friendsSchema = require('./friends')




const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type:String, required: true},
  password: {type: String, required: true},
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thoughts',
  }],
  friends: [{type: Schema.Types.ObjectId,
    ref: 'friends',
  }],
})

const User = mongoose.model('User', userSchema);

module.exports = User;