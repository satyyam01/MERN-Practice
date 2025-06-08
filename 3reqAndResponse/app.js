// selective logging of request 
const http = require('http');


const server=http.createServer((req, res)=>{
  console.log(req.url, req.headers, req.method); //selective logging of request data

  process.exit(); // exiting the event loop after first req is hit
})

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});