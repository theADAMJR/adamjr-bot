const { model, Schema } = require('mongoose');

module.exports = model('playlist', new Schema({
  _id: String
}));