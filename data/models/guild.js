const { model, Schema } = require('mongoose');

class GeneralModule {
  prefix = 'yt ';
}

module.exports = model('guild', new Schema({
  _id: String,
  general: { type: Object, default: new GeneralModule() }
}));