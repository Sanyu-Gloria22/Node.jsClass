const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
 emailaddress:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  // role:{
  //   type:String,
  //   required:true
  // }

});

module.exports = mongoose.model('UserModel', managerSchema )