const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   name : {
    type:String,
    required : [true,'Please add a name']
   },

   email : {
    type:String,
    required : [true,'Please add a email'],
    unique:true
   },

   password :{
    type:String,
    required : [true,'Please add a Password'],
   },

   isAdmin : {
    type : Boolean,
    required:true,
    default: false
   }
},{timestamps : true})

module.exports = mongoose.model('users',userSchema)