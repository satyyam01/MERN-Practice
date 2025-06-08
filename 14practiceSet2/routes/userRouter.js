const express = require("express")

const userRouter = express.Router() // used to create a new router instance 

const path = require("path") // used to add path functionality ( for html files)

const rootDir = require("../utils/pathUtil")

const { registeredHomes } = require("./hostRouter") // import the registered homes array from hostRouter


// home page and add home option
userRouter.get("/",(req, res, next) => {


  console.log(registeredHomes);


  res.render("home", { registeredHomes: registeredHomes, pageTitle: "Home Page", currentPage: "home"}) // render the home.ejs file with the registered homes array and page title;
});

module.exports = userRouter

//exports.userRouter = userRouter;