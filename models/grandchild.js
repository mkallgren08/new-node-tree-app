const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema;

const grandchildSchema = new Schema({
  parent: {type: ObjectId}, 
  name: { type: String },
  value: {type: Number}
});

module.exports = mongoose.model('Grandchild', grandchildSchema); 