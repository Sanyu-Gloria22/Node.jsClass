const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel")
//Getting a manager's form
router.get("/manager", (req, res) => {
  res.render("manager", {title: "manager page"})                               //render replaces sendFile
});


router.post("/manager", (req, res) => {
  const user = new userModel(req.body);
  console.log(req.body);
  user.save() 
  res.redirect("login")
});


router.get("/login", (req, res) => {
  res.render("login", {title: "login page"})                               //render replaces sendFile
});


router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("stock")

});





module.exports = router;