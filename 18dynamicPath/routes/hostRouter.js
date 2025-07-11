const express = require('express');

const hostRouter = express.Router();

const hostController = require("../controllers/hostController"); // import the addHomePost function from the hostController


// 1. add home
hostRouter.get("/addHome", hostController.addHomeGet);

// 2. add home (post)
hostRouter.post("/addHome", hostController.addHomePost);

// 3. edit home
hostRouter.get("/editHome/:homeId", hostController.editHomeGet);

// 4. edit home (post)
hostRouter.post("/editHome", hostController.editHomePost);

// 5. delete home (post)
hostRouter.post("/deleteHome/:homeId", hostController.deleteHomePost);

// 6. home list-admin
hostRouter.get("/adminHomeList", hostController.adminHomeListGet);



exports.hostRouter = hostRouter;