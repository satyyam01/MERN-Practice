const express = require("express")

const userRouter = express.Router() // used to create a new router instance 

const path = require("path") // used to add path functionality ( for html files)

const rootDir = require("../utils/pathUtil")


// home page and add home option
userRouter.get("/",(req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"))
})

module.exports = userRouter

//exports.userRouter = userRouter;