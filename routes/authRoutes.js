const express = require("express");
const router = express.Router();
const passpor = require("passport")

const userModel = require("../models/userModel");
const passport = require("passport");
//Getting a manager's form
router.get("/signup", (req, res) => {
  res.render("manager", {title: "manager page"})                               //render replaces sendFile
});

router.post("/signup", async(req, res) => {
  try {
  const user = new userModel(req.body);
  console.log(req.body);
  let existingUser = await userModel.findOne({emailaddress:req.body.emailaddress});
  if(existingUser) {
    return res.status(400).send("Email already registered")
  }else{
    const user = new userModel(req.body);
    await userModel.register(user, req.body.password, (error) => {
      if (error) {
        throw error;
      }
    })
  }
   res.redirect("/login")
  } catch {
    res.status(400).send("Sorry try again")
  }
});

router.get("/login", (req, res) => {
  res.render("login", {title: "login page"})                               //render replaces sendFile
});


router.post("/login", passport.authenticate("local",{faliureRedirect:'/login'}),  (req, res) => {
  req.session.user = req.user;
  if(req.user.role === 'Manager'){
    res.redirect('/dash')
  }else if(req.user.role === 'Attendant'){
    res.redirect('/stock');
  }else (res.render('nonuser'))
  });

router.get( "/logout", (req,res) =>{
  if(req.session){
    req.session.destroy((error) =>{
      if (error){
        return res.status(500).send('Error loggingout')
      }
      res.redirect('/')
    })
  }
  
});

// router.post("/logout", (req,res)) =>{
//   req.logout((error)=>{
//     if (error){
//       return res.status(500).send('Error Loggingout')
//     }
//   })
// }



module.exports = router;