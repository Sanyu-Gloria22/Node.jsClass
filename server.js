//1. Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const moment = require('moment');


require('dotenv').config();
const userModel = require("./models/userModel");

// import routes
//  const classRoutes = require(`./routes/classRoutes`);

const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");

// const salesRoutes = require("/routes/saleRoutes");

//2. Instantiations

const app = express();
const port = 3000;

//3. Configurations
app.locals.moment = moment;

//setting up mongoDB configurations

mongoose.connect(process.env.MONGODB_URI, {

  //  useNewUrlParser: true,
  //  useUnifiedTopology: true

})
.then(() => console.log(" Connected to MongoDB Atlas"))
.catch(err => console.error(" MongoDB connection error:", err));


//setting engine to pug

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));

//4. Middleware
//app.use(express.static('public'));

app.use(express.static(path.join(__dirname, "public")));
app.use("/public/uploads", express.static(__dirname +"/public/uploads" ))      // helps us to upload our images and to know where our images are going to be
app.use(express.urlencoded({ extended: true }));    //extended helps to pass data from forms

//express session configs

app.use(expressSession({
  secret: process.env.SESSION_SECRET,   //this is just a secret of your application
  resave: false,         //Means we do not save the sessions And session is the moment a person walks in an application untill he lives.
  saveUninitialized: false,     // do not save th unsucessful information
  store: MongoStore.create({mongoUrl:process.env.MONGODB_URI}),  //creting a store in our Mongodb
  cookie: {maxAge:24*60*60*1000}      //Oneday, meaning we want to be live for one day
}))         //This is done to add a Cookie

//passport configs
app.use(passport.initialize());   
app.use(passport.session());     

//Authentication With Passport local strategy
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());



//Simple request time logger for a specific route
/*app.use("/gloria", (req, res, next) => {
  console.log("A new request received at " + Date.now());
  next();
});*/

// Simple request time logger
/* app.use((req, res, next) => {
   console.log("A new request received at " + Date.now());        //This helps to know when someone tried to access the website
   // This function call tells that more processing is
   // required for the current request and is in the next middleware
   //function/route handler.
    next();
 });*/



//5. Routes
// //
//app.use("/", classRoutes);

app.use("/", authRoutes);
app.use("/", stockRoutes);

// app.use("/", salesRoutes);





// non-existent route handler
app.use((req, res) => {
  res.status(404).send(`Oops! Route not found.`);
});

//6. Bootstrapping Server
//these should be the last line in the this file
app.listen(port, () => console.log(`listening on port ${port}`));
