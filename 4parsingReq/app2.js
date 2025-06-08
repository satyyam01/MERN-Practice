const http=require('http'); // import the http module
const requestHandler=require('./usingModules'); // import the custom made 'usingModules' module

const server = http.createServer(requestHandler); // create a server using the requestHandler function

const port=3000;

port.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});