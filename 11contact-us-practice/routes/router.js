const express = require('express')

const router = express.Router();

const path = require('path'); // used to add path functionality (for HTML files)

const rootDir = require('../utils/pathUtil'); // used to provide functionality to let every js file import HTML files with their absolute path using the root directory of the project

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'index.html'));
});


router.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'form.html'));
});


router.post("/contact-us", (req, res, next) => {
  console.log(req.body); // log the form data to the console
  res.sendFile(path.join(rootDir, 'views', 'formReceived.html')) // redirect to the home page after form submission
});

module.exports = router;