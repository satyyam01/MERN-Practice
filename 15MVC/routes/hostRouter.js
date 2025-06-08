const express = require('express');

const hostRouter = express.Router();

const homeController = require("../controllers/home"); // import the addHomePost function from the hostController



hostRouter.get("/add-home", homeController.addHomeGet);


// Handle the form submission for adding a new home
hostRouter.post("/add-home", homeController.addHomePost);


exports.hostRouter = hostRouter;