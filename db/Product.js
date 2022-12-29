const db = require('./Config')
const mongoose = require('mongoose')


const product = new mongoose.Schema({
name:String,
price:String,
brand:String,
})


module.exports = mongoose.model("products",product)