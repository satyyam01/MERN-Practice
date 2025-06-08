const http=require('http');

const server = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html'); // set type of content to be sent to the client; here we are sending html content

  res.write('<html>');

  res.write('<head><title>My First Server</title></head>');

  res.write('<body> <h1>Hello World</h1>');

  res.write('</html>');

  res.end(); // end the response; this is important to send the response to the client; if we do not call this, the client will not receive any response and will keep waiting for it. This will cause a memory leak in the server as it will keep waiting for the response to be sent to the client. So always call this method at the end of the response.
});


const port = 3000;


server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});