const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const managerSchema = new mongoose.Schema({
 emailaddress:{
    type:String,
    required:true,
    unique:true,
  },
  // role:{
  //   type:String,
  //   required:true
  // }

});

managerSchema.plugin(passportLocalMongoose,{
  usernameField:"emailaddress"
});
module.exports = mongoose.model('UserModel', managerSchema )