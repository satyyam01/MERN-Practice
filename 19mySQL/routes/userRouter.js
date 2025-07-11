const express = require("express")

const userRouter = express.Router() // used to create a new router instance

const userController = require("../controllers/userController"); // import the homeGet function from the home controller




userRouter.get("/", userController.homeGet);

userRouter.get("/homeList", userController.homeListGet);

userRouter.get("/homeDetail/:homeId", userController.homeDetailGet); // dynamic path

userRouter.get("/favList", userController.favListGet);

userRouter.post("/favList", userController.favListPost);

userRouter.get("/reserve", userController.reserveGet);

userRouter.get("/bookings", userController.bookingsGet);

userRouter.post("/favList/delete/:homeId", userController.deleteFavPost);




module.exports = userRouter



