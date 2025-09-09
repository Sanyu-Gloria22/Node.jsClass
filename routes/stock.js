const express = require("express");
const router = express.Router();

const stockModel = require("../models/stockModel")
router.get("/stock", (req, res) => {
  res.render("stock", {title: "Stock page"})                               //render replaces sendFile
});

router.post("/stock", async (req, res) => {
  try {
    const stock = new stockModel(req.body)    //this keeps all the data in the stockModel
     console.log(req.body); 
    await stock.save()
  } catch (error) {
    console.error(error)
    res.redirect("/stock")    
  }
});

router.get("stock", (req, res) => {
  console.log(req.body)
  res.redirect("/dash")
})



















module.exports = router;