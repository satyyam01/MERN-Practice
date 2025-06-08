const express = require("express")

const userRouter = express.Router() // used to create a new router instance

const userController = require("../controllers/userController"); // import the homeGet function from the home controller


// home page and add home option
userRouter.get("/", userController.homeGet);

userRouter.get("/homeList", userController.homeListGet);

userRouter.get("/homeDetail", userController.homeDetailGet);

userRouter.get("/favList", userController.favListGet);

userRouter.get("/reserve", userController.reserveGet);

userRouter.get("/bookings", userController.bookingsGet);




module.exports = userRouter



