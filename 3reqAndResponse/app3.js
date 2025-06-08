// taking user input from the browser in a form (and storing dummy data in a txt file) and then re routing the user to another page after submitting the form

const http=require('http');

const fs=require('fs');


const server=http.createServer((req, res) => {

  console.log(req.url, req.method, req.headers);

  if(req.url === '/form'){

    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<head><title>Form</title></head>');
    res.write('<body> <h1>Fill the Details</h1>');

    res.write('<form action="/submit-details" method="POST">'); // creating a form

    res.write('<input type="text" name="username" placeholder="Enter your name"> <br>'); // input type text is used to take input from the user; name is used to identify the element in the form and process the input on the server side

    res.write('<label for="male">Male</input>'); // id is used to identify the element in the form

    res.write('<input type="radio" id="male" name="gender" value="male">');

    res.write('<label for="female">Female</input>');

    res.write('<input type="radio" id="female" name="gender" value="female">');

    res.write('<br><input type="submit" value="Submit">');

    res.write('</form>');

    res.write('</body>');

    res.write('</html>');

    return res.end();

  } else if(req.url.toLowerCase() === '/submit-details' && req.method === 'POST'){ // this is the form submission page

    fs.writeFileSync('user-data.txt', 'Satyam Nautiyal'); // write the user data to a file; here we are writing the url of the request
    res.statusCode = 302; // 302 is used to redirect the user to another page

    res.setHeader('Location', '/'); // location header is used to redirect the user to another page

    return res.end();

  } else {
    res.write('<html>');
    res.write('<head><title>Default Page</title></head>');
    res.write('<body> <h1>Hello World</h1>');
    res.write('</body>');
    res.write('</html>');

    res.end();
  }
});


const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
