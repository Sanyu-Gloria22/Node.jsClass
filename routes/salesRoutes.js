const express = require("express");
const router = express.Router();

const stockModel = require("../models/stockModel")
router.get("/sales", (req, res) => {
  res.render("sales", {title: "Sales page"})                               //render replaces sendFile
});

router.post("/sales", async (req, res) => {
  try {
    const stock = new stockModel(req.body)    //this keeps all the data in the stockModel
     console.log(req.body); 
    await stock.save()
  } catch (error) {
    console.error(error)
    res.redirect("/sales")    
  }
});

router.get("sales", (req, res) => {
  console.log(req.body)
  res.redirect("/dash")
})



















module.exports = router;