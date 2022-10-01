const { builtinModules } = require('module');
const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const reactions = require('./reactions')


const thoughtsSchema = mongoose.Schema({
  content: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  dateCreated: {type: Date, default: Date.now},
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Reactions'
  }],
})

const Thoughts = mongoose.model('Thoughts', thoughtsSchema)

module.exports = Thoughts;