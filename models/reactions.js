const { builtinModules } = require('module');
const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')


const reactionSchema = mongoose.Schema({
  reactionCount: {type: Number},
  reactionContent: {type:String},
  dateCreated: {type: Date, default: Date.now}
})

const Reactions = mongoose.model('Reactions', reactionSchema)


module.exports = Reactions;
