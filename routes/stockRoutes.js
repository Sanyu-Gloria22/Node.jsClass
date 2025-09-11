const express = require("express");
const router = express.Router();
const passport = require('passport');

const stockModel = require("../models/stockModel")

router.get("/recordstock", (req, res) => {
  res.render("stockRecord", {title: "StockRecord page"})                               //render replaces sendFile
});

router.post("/recordstock", async (req, res) => {
  try {
    const stock = new stockModel(req.body)    //this keeps all the data in the stockModel
     console.log(req.body); 
    await stock.save()
    res.redirect("/stocklist");   
  } catch (error) {
    console.error(error)
    res.status(500).send("Error saving stock record.");
  }
});

// router.get("/recordstock", (req, res) => {
//   res.render("stockRecord")
// })

//Getting stock from the database


router.get("/stocklist", async (req, res) => {
  try {
      let items = await stockModel.find().sort({$natural:-1});
      
      res.render("stock", {items});  //this means that all items from the stockrecording are being called here
  } catch (error) {
    res.status(400).send("Unable to get data from the database.");
  }
});

//Updating stock
router.get("/editstock/:id", async(req, res)=>{
  let items = await stockModel.findById(req.params.id);
  console.log(items);
  res.render(`editstock`, {items});
})
router.put("/editstock/:id", async (req, res) =>{
   try {
      console.log(req.params.id);
      // const product = await stockModel.findByIdAndUpdate(req.params.id, req.body,{new: true});
      // console.log(product);
      // if(!product) {
      //   return res.status(4040).send("Product not found")
      // }  
      // res.redirect("/stocklist")         
  } catch (error) {
    
  }

});
















module.exports = router; 