const http=require('http');


const server=http.createServer((req, res) => {

  console.log(req.url, req.method, req.headers); // log the request url, method and headers

  if(req.url === '/'){ // this is the default page

    res.setHeader('Content-Type', 'text/html'); // set type of content to be sent to the client; here we are sending html content

    res.write('<html>');

    res.write('<head><title>Default Page</title></head>');

    res.write('<body> <h1>Hello World</h1>');

    res.write('</html>');

    return res.end(); // response to be ended ONLY ONCE

  } else if (req.url === '/about'){ // this is the about page

    res.setHeader('Content-Type', 'text/html'); // set type of content to be sent to the client; here we are sending html content

    res.write('<html>');

    res.write('<head><title>About page</title></head>');

    res.write('<body> <h1>Hi, This is Satyam</h1>');

    res.write('</html>');

    return res.end();

  } else { // this is the 404 page

    res.setHeader('Content-Type', 'text/html'); // set type of content to be sent to the client; here we are sending html content

    res.write('<html>');

    res.write('<head><title>404</title></head>');

    res.write('<body> <h1>Undefined Route</h1>');

    res.write('</html>');

    res.end(); // end response

  }
});


const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
