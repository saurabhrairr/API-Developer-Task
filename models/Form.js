const mongoose = require('mongoose')


const user=new mongoose.Schema({
     name:String,
     age:Number,
     salary:Number,
     designation :String


})




const userform =mongoose.model("userformdetail",user)

module.exports = userform;