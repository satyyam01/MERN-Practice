const { sum }  = require('./sum');

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>
    <head><title>Home Page</title></head>
    <body>
    <h1>Go to Calculator</h1>
    <a href="/calculator">Calculator</a>
    </body>'
    </html>`);
    return res.end();
  } else if (req.url.toLocaleLowerCase() === '/calculator') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>
    <head><title>Calculator</title></head>
    <body>
    <form action="/calculate" method="POST"> <br>

    <input type="number" id="num1" name="num1"  placeholder="Enter first number">

    <input type="number" id="num2" name="num2" placeholder="Enter second number"> <br> <br>

    <br> <button type="submit">Sum</button>
    </form>
    </body>
    </html>`);
    return res.end();
  }else if (req.url.toLocaleLowerCase() === '/calculate' && req.method === 'POST') {

    sum(req, res); // calling the sum function from sum.js

  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write(`<html>
    <head><title>404 Not Found</title></head>
    <a href="/">Go back</a>
    <body>
    <h1>404 Not Found</h1>
    </body>
    </html>`);
    res.end();
  }

};

exports.requestHandler = requestHandler; // exporting the requestHandler function as a object