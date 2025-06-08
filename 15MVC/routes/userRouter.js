const express = require("express")

const userRouter = express.Router() // used to create a new router instance

const homeController = require("../controllers/home"); // import the homeGet function from the home controller


// home page and add home option
userRouter.get("/", homeController.homeGet);

module.exports = userRouter

//exports.userRouter = userRouter;