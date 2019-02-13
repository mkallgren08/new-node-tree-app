const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const childSchema = new Schema({
  nodetype: {type:String},
  parent: {type: ObjectId}, 
  name: { type: String },
  value: {type: Number}
},
{collection: 'nodes'}
);
const Child =  mongoose.model('Child', childSchema); 
module.exports = Child