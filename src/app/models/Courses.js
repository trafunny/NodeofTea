const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    _id: ObjectId,
    name: { type: String, maxLength: 255 , default:"anonymous" },
    description: String,
    image: { type: String, maxLength: 255 },
    price: { type : Number , min: 100000 , index : true } ,
    createdAt : { type : Date , default : Date.now} ,
    updatedAt : { type : Date , default : Date.now} ,
})

module.exports = mongoose.model('Course',Course);
