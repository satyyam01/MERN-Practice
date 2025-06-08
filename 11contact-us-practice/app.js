const express = require('express');

const app = express(); // only required in the main file for server setup

const path = require('path'); // used to add path functionality (for HTML files)

const router = require('./routes/router'); // import the router module

const rootDir = require('./utils/pathUtil'); // used to provide functionality to let every js file import HTML files with their absolute path using the root directory of the project


app.use((req, res, next) => {
  console.log(req.method, req.url); // log the request method and URL
  next(); // pass control to the next middleware function
});

app.use(express.urlencoded()); // middleware to parse URL-encoded bodies (form data)
app.use(router); // use the router for handling routes

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html')); // send a 404 error page if no route matches
});


const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});