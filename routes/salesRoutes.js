const express = require("express");
const router = express.Router();
const { ensureauthenticated, ensureAgent } = require("../middleware/auth");

const salesModel = require("../models/salesModel");
const StockModel = require("../models/stockModel");

router.get("/sales", async (req, res) => {
  try {
    const stocks = await StockModel.find();
    res.render("sales", { stocks });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/sales", ensureauthenticated, ensureAgent, async (req, res) => {
  try {
    const {
      customerName,
      productType,
      productName,
      quantity,
      unitPrice,
      saleDate,
      paymentType,
      transportRequired,
      total,
    } = req.body;
    const userId = req.session.user._id;
    const stock = await StockModel.findOne({
      productType: productType,
      ProductName: productName,
    });
    if (!stock) {
      return res.status(400).send("Stock not found!");
    }
    if (stock.quantity < Number(quantity)) {
      return res
        .status(400)
        .send("Insufficient stock!, only ${stock.quantity} available");
    }
    //if you want to calculate total using backend not frontend(add it's field in the dis-structuring)
    let totalPrice = unitPrice * quantity;
    if (transportRequired) {
      totalPrice *= 1.05;
    }

    //if total is already captured no need to do the above
    // if(transportRequired){
    //     total *= 1.05    //add 5%
    // };
    if (stock && stock.quantity > 0) {
      const sale = new salesModel({
        customerName,
        productType,
        productName,
        quantity,
        unitPrice,
        saleDate,
        paymentType,
        salesAgent: userId,
        transportRequired: !!transportRequired,
        total: totalPrice,
      });
      console.log(userId);
      await sale.save();

      //Decrease  quantity from the stock collection
      stock.quantity -= quantity
      console.log("New quantity after sale", stock.quantity)
      await StockModel.save();
      res.redirect("/salestable");
    }else{
        return res.status(404).send("Product Sold Out!")
    }
  } catch (error) {
    console.error(error.message);
    res.redirect("/sales");
  }
});

//printing in the terminal
// console.log("saving a sale", sale);

router.get("/salestable/:id", async (req, res) => {
  try {
    //sales agent only sees their sales
    const sales = await salesModel.find().populate("salesAgent", "email");
    // req.session.user = currentUser
    const currentUser = req.session.user;
    console.log(currentUser);
    res.render("salestable", { sales, currentUser });
  } catch (error) {
    console.log(error.message);
    res.redirect("/");
  }
});

router.get("/getreceipt", async (req, res) => {
  try {
    //sales agent only sees their sales
    const sale = await salesModel.findOne({_id:req.params.id}).populate("salesAgent", "email");
    res.render("reciept", { sales, currentUser });
  } catch (error) {
    console.log(error.message);
    res.status(400).send
  }
});

module.exports = router;