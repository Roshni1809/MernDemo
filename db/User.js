const db = require('./Config')
const mongoose = require('mongoose')


const user = new mongoose.Schema({
name:String,
email:String,
pwd:String})


module.exports = mongoose.model("user",user)