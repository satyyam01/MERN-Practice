// receiving chunks of data and processing it using a buffer via data and end events

const http=require('http');


const server=http.createServer((req, res) => {

  console.log(req.url, req.method);

  if(req.url.toLowerCase() === '/'){

    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');

    res.write('<body>');

    res.write('<head><title>Server</title></head>');

    res.write('<h1>Fill the Form</h1>');

    res.write('<form action="/submit" method="POST">'); // pay attention to the case of the method

    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');

    res.write('<label><input type="radio" id="male" name="gender" value="male"> Male</label>');

    res.write('<label><input type="radio" id="female" name="gender" value="female"> Female</label>');

    res.write('<br><input type="submit" value="Submit">');

    res.write('</form>');

    res.write('</body>');

    res.write('</html>');

    return res.end(); // end the response;

} else if(req.url.toLowerCase()==='/submit' && req.method === 'POST'){ // V IMPORTANT : the case sensitivity of the Methods is also V IMPORTANT or use .toLowerCase()

  const body = []; // this is an array to store the chunks of data received

  req.on('data', chunk => { // this event is fired when a chunk of data is received; here we are receiving the data in chunks; this is useful when the data is large and we do not want to load it all in memory at once
    console.log(chunk);

    body.push(chunk); // push the chunk of data to the array
  });

  req.on('end', () => { // this event is fired when all the data is received; here we are processing the data after all the data is received

    const fullBody = Buffer.concat(body).toString(); // this will convert the array of chunks to a single buffer and then to a string; helps process data as a single unit
    console.log(fullBody);

    res.statusCode = 302; // end this inside the end event only as we are sending the response after all the data is received; 
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