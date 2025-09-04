const express = require("express")
const router = express.Router()
// const path = require("path")
// //routing, these can be called a path
// app.get('/', (req, res) => {           // what ever come after the get in the blackets is called a path
//   res.send(`Homepage! Hello world.`);
// });

//syntax of a route
//App.Method(PATH, HANDLER);
//Serving HTML files
// app.get("/", (req, res) => {
//   // what ever come after the get in the blackets is called a path
//   res.sendFile(__dirname + "/html/index.html");
// });

router.get(`/about`, (req, res) => {
  res.send(`About us page. Welcome`);
});

router.get(`/gloria`, (req, res) => {
  res.send(`Welcome to Gloria's page`);
});

router.post(`/about`, (req, res) => {
  res.send(`Got a Post requst`);
});

router.put(`/data`, (req, res) => {
  res.send(`Got a Put requst at /user`);
});

router.delete(`/user`, (req, res) => {
  res.send(`Got a DELETE requset at/user`);
});

//path parameters and query strings
//path prarams
router.get(`/pathparams/:username`, (req, res) => {
  res.send(`This is the Username ` + req.params.username);
});

//query strings

router.get(`/querystrings`, (req, res) => {
  res.send(` ` + req.params.username);
});

router.get(`/students`, (req, res) => {
  res.send(`This is ` + req.query.name +` from cohort ` + req.query.cohort +` class of ` +req.query.class);
});



router.post("/registeruser", (req, res) => {
  // what ever come after the get in the blackets is called a path
  console.log(req.body); //stands for everything from the form
});


//Welcoming page
router.get("/index", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});

 
router.post("/index", (req, res) => {
  console.log(req.body);
});

//stock recording
router.get("/stock", (req, res) => {
  res.sendFile(__dirname + "/html/stock.html");
});

 
router.post("/stock", (req, res) => {
  console.log(req.body);
});

//signout 
router.get("/managerForm", (req, res) => {
  res.sendFile(__dirname + "/../html/manager.html");
});

 
router.post("/managerForm", (req, res) => {
  console.log(req.body);
});

module.exports = router;