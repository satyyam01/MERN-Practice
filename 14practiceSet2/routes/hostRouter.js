const express = require('express');

const hostRouter = express.Router();

const path = require("path");

const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home",(req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home", currentPage: "add-home" }); // render the addHome.ejs file with the page title
})


const registeredHomes = [];

// Handle the form submission for adding a new home
hostRouter.post("/add-home",(req, res, next) => {
  console.log(req.body);

  const newHome = {
    homeName: req.body.homeName,
    homePrice: req.body.homePrice,
    homeLocation: req.body.homeLocation,
    homeImage: req.body.homeImage
    };

  registeredHomes.push(newHome);


  res.render("homeAdded", { pageTitle: "Home Added", home: newHome , currentPage: "add-home"}); // render the homeAdded.ejs file with the page title and home name);
});

exports.registeredHomes = registeredHomes;

exports.hostRouter = hostRouter; // export the registered homes array to be used in other files