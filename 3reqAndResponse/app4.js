// create a home page with navigation bar and links to different pages, route to these pages and show a welcome message
const http=require('http');

const fs=require('fs');


const server=http.createServer((req, res) => {

  console.log(req.url, req.method, req.headers);

  if(req.url === '/'){
// IMPORTANT: Use ` for multi line strings
    res.write(`
      <html lang="en">
      <head>
        <title>Myntra</title>
      </head>

      <body>
        <head>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/men">Men</a></li>
              <li><a href="/women">Women</a></li>
              <li><a href="/kids">Kids</a></li>
            </ul>
          </nav>
        </head>
      </body>
      </html>`);

    return res.end();

  } else if(req.url.toLocaleLowerCase() === '/men' ){

    res.write('<html>');
    res.write('<head><title>men page</title></head>');
    res.write('<body> <h1>welcome to men</h1>'); // Sirf ye bhi chalega, no need full html syntax
    res.write('</body>');
    res.write('</html>');

    return res.end();

  } else if(req.url.toLowerCase() === '/women'){

    res.write('<html>');
    res.write('<head><title>women page</title></head>');
    res.write('<body> <h1>welcome to women</h1>');
    res.write('</body>');
    res.write('</html>');

    return res.end();

  } else if(req.url.toLowerCase() === '/kids'){

    res.write('<html>');
    res.write('<head><title>kids page</title></head>');
    res.write('<body> <h1>welcome to kids</h1>');
    res.write('</body>');
    res.write('</html>');

    return res.end();

  } else if(req.url.toLowerCase() === '/cart'){

    res.write('<html>');
    res.write('<head><title>cart</title></head>');
    res.write('<body> <h1>welcome to cart</h1>');
    res.write('</body>');
    res.write('</html>');

    return res.end();

  } else{
    res.write('<html>');
    res.write('<head><title>Default Page</title></head>');
    res.write('<body> <h1>Hello World</h1>');
    res.write('</body>');
    res.write('</html>');

    res.end();
  }});


  const port=3000;

  server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });

