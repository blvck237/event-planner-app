const mongoose = require('mongoose');
async function connect() {
  // mongoose.set('debug', true);
  return mongoose.connect('mongodb://localhost:27017/event-planner', { useNewUrlParser: true });
}

exports.connect = connect;
