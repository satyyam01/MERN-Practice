// core modules
//const http = require('http'); // no need of http also

// external modules
const express = require('express'); // import express module

// local modules
//const reqHandler = require('./reqHandler');

const app = express() // create an instance of express

//const server = http.createServer(app); // create a server using the express app; no need of http also

const port=3000;


app.use("/", (req, res, next) =>{ // path can be specified for routing; if not specified, it will match all paths
  console.log("Middleware 1", req.url, req.method);
  next(); // call next middleware in the stack or return response
});

app.use("submit-detail",(req, res, next) => {
  console.log("Middleware 2", req.url, req.method);

  res.send("<p>Response from Middleware 2</p>"); // call next middleware in the stack or return response ; Can also be used to send html response; Auto sets content-type to text/html
  });

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });