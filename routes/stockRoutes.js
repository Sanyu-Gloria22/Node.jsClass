const express = require("express");
const router = express.Router();
const passport = require('passport');
const multer = require("multer");
const {ensureauthenticated,ensurManager} = require("../middleware/auth");

const stockModel = require("../models/stockModel");

// image upload config
let storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, "/public/uploads")
  },

  filename:(req,file,cb)  =>{
    cb(null,file.originalname)
  }
})

//ensureauthenticated, ensurManager
router.get("/recordstock", (req, res) => {
  res.render("stockRecord");                               //render replaces sendFile
});

//ensureauthenticated, ensurManager
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



 /*image upload*/
/*router.post("/recordstock",Upload.single("image") async (req, res) => {
  try {
    const stock = new stockModel(req.body);   //this keeps all the data in the stockModel
    stock.image = req.file.path
     console.log(req.body); 
    await stock.save();
    res.redirect("/stocklist");   
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving stock record.");
  }
});*/




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

// router.delete("/stocklist/:id", async (req, res) =>{
//   try {
//     await stockModel.findByIdAndDelete(req.params.id)
//     res.redirect("/stocklist")
//   } catch (error) {
//     res.status(500).send("error deleting stock");
//   }
// });


router.post("/deletestock", async (req, res)=>{
  try {
     await stockModel.deleteOne({_id:req.body.id});
     res.redirect("/stocklist")
  } catch {
    console.log()
    res.status(400).send("Unable to delete item from the database")
  }
});















module.exports = router; 