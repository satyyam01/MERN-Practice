const express = require('express');

const hostRouter = express.Router();

const path = require("path");

const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home",(req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home" }); // render the addHome.ejs file with the page title
})


const registeredHomes = [];

hostRouter.post("/add-home",(req, res, next) => {
  console.log(req.body);


  registeredHomes.push({homeName: req.body.homeName});


  res.render("homeAdded", { pageTitle: "Home Added", homeName: req.body.homeName }); // render the homeAdded.ejs file with the page title and home name);
});

exports.registeredHomes = registeredHomes;

exports.hostRouter = hostRouter; // export the registered homes array to be used in other files