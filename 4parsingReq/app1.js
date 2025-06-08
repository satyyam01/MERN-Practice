const http=require('http');

const fs=require('fs');
const server=http.createServer((req, res) => {

  console.log(req.url, req.method);

  if(req.url.toLowerCase() === '/'){

    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');

    res.write('<body>');

    res.write('<head><title>Server</title></head>');

    res.write('<h1>Fill the Form</h1>');

    res.write('<form action="/submit" method="POST">');

    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');

    res.write('<label><input type="radio" id="male" name="gender" value="male"> Male</label>');

    res.write('<label><input type="radio" id="female" name="gender" value="female"> Female</label>');

    res.write('<br><input type="submit" value="Submit">');

    res.write('</form>');

    res.write('</body>');

    res.write('</html>');

    return res.end();

} else if(req.url.toLowerCase()==='/submit' && req.method === 'POST'){

  const body = [];

  req.on('data', chunk => {

    body.push(chunk);
  });

  req.on('end', () => {

    const fullBody = Buffer.concat(body).toString();

    console.log(fullBody); // this will print the string

    const params = new URLSearchParams(fullBody); // this will convert the string to a URLSearchParams object

    // const bodyObject=[]; // store the data in an object

    // for(const [key, value] of params.entries()){ // breaks down down the whole string into key-value pairs
    //   bodyObject[key]=value; // stores in the object
    // }

    const bodyObject = Object.fromEntries(params.entries()); // this will convert the URLSearchParams object to a regular object automatically

    console.log(bodyObject); // this will print the object's key-value pairs

    fs.writeFileSync('userData.txt', JSON.stringify(bodyObject)); // this will write the object to a file; this is a synchronous method; use async methods in production

    res.statusCode = 302;

    res.setHeader('Location', '/');

    return res.end();
  });

} else {
  res.write('<h1>Hello World</h1>');
  res.end();
}});


const port=3000;

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});