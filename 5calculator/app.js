const http=require('http');
const fs=require('fs');

const { requestHandler } = require('./requestHandler'); // import and de structure the requestHandler function from requestHandler.js

const { sum } = require('./sum'); // import and de structure the sum function from calculator.js


const server = http.createServer(requestHandler);


  const port=3000;

  server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  })