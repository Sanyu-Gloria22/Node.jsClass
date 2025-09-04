//1. Dependencies
const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
require('dotenv').config();

// import routes
//  const classRoutes = require(`./routes/classRoutes`);
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");

//2. Instantiations
const app = express();
const port = 3000;

//3. Configurations
//setting up mongoDB configurations
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connected to MongoDB Atlas"))
.catch(err => console.error(" MongoDB connection error:", err));

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));


//setting engine to pug
app.set('veiw engine', 'pug');
app.set('veiws', path.join(__dirname, 'veiws'))

//4. Middleware
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));          //extended helps to pass data from forms

//Simple request time logger for a specific route
app.use("/gloria", (req, res, next) => {
  console.log("A new request received at " + Date.now());
  next();
});

// Simple request time logger
// app.use((req, res, next) => {
//    console.log("A new request received at " + Date.now());        //This helps to know when someone tried to access the website
//    // This function call tells that more processing is
//    // required for the current request and is in the next middleware
//    //function/route handler.
//    next();
// });



//5. Routes
// //
//app.use("/", classRoutes);
app.use("/", authRoutes);
app.use("/", stockRoutes);





// non-existent route handler
app.use((req, res) => {
  res.status(404).send(`Oops! Route not found.`);
});

//6. Bootstrapping Server
//these should be the last line in the this file
app.listen(port, () => console.log(`listening on port ${port}`));
