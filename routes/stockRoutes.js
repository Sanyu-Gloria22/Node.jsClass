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
const uploads = multer({ storage: storage});

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
 

router.get("/dash", (req, res) =>{
  res.render("dash");
});


router.post("/dash", async (req, res) =>{
  try {
     // expences for buying stock
    let totalExpenseTimber = await stockModel.aggregate([
      {$match:{productName: "timber"} },
      {$group:{_id:"$pr0ductType",
        totalQuantity:{$sum: "$quantity"},
        //Cost price is unit price for one item
        totalCost: {$sum: {$multiply: ["costPrice", "$costPrice"] } },
      }},
    ])

    let totalExpensePoles = await stockModel.aggregate([
      {$match:{productName: "poles"} },
      {$group:{_id:"$pr0ductType",
        totalQuantity:{$sum: "$quantity"},
        //Cost price is unit price for one item
        totalCost: {$sum: {$multiply: ["costPrice", "$costPrice"] } },
      }},
    ])

     //Sales revenue
     let totalRevenueChair = await salesModel.aggregate([
      {$match:{productName: "chair"} },
      {$group:{_id:"$pr0ductType",
        totalQuantity:{$sum: "$quantity"},
        //Cost price is unit price for one item
        totalCost: {$sum: {$multiply: ["costPrice", "$costPrice"] } },
      }},
    ])
    //console.log(totalExpensePoles)
    //To avoid crushing the app if no expence have been added
    // set default values if no expences in the DB
    totalRevenueChair = totalRevenueChair[0]||{totalQuantity:0,totalCost}
    res.render("dash", {
    totalExpensePolesPoles:totalExpensePoles[0],
    totalExpenseTimber:totalExpenseTimber[0],
    totalRevenueChair:totalRevenueChair[0],
    });
    
  } catch (error) {
    res.status(400).send("Unable to find item from the DB")
    console.log('Aggregation Error:',error.message)
  }
});

















module.exports = router; 