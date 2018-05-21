const mongoose = require('mongoose');
const config = require('../../config');

const connect = exports.connect = () => {
  mongoose.connect(config.MONGO_URI);
};

const disconnect = exports.disconnect = async () => {
  await empty();
  await mongoose.disconnect();
};

const empty = exports.empty = async () => {
  await mongoose.connection.db.dropDatabase();
};
