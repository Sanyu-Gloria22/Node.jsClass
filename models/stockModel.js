const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const stockSchema = new mongoose.Schema({
  productName :{
    type:String,
    required:true,
  },
    productType :{
    type:String,
    required:true,
  },
  costPrice :{
    type:String,
    required:true,
  },
  sellingPrice :{
    type:String,
    required:true,
  },
  quantity :{
    type:String,
    required:true,
  },
  supplierName :{
    type:String,
    required:true,
  },
  dateReceived :{
    type:String,
    required:true,
  },
  quality :{
    type:String,
    required:true,
  },
  color :{
    type:String,
    required:true,
  },
  measurements :{
    type:String,
    required:true,
  } // role:{
  //   type:String,
  //   required:true
  // }

});


module.exports = mongoose.model("StockModel", stockSchema  )