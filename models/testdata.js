const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testdataSchema = new Schema({
  name: { type: String, required: true }
},
{
  collection: 'testdata'
}
);

const TestData = mongoose.model("TestData", testdataSchema);

module.exports = TestData;