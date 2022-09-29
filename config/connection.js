const mongoose = require('mongoose');

const connectionUri = 'mongodb://localhost:27017/mySocialDB'

mongoose.connect(connectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose.connection;
