const express = require('express')

const bodyParser = require('body-parser'); // For parsing request bodies

const app = express();


app.use((req, res, next)=> {
  console.log(req.url, req.method, "Middleware 1");
  next();
})

app.use((req, res, next)=> {
  console.log(req.url, req.method, "Middleware 2");
  next();
});

app.use((req, res, next)=> {
  console.log(req.url, req.method, "Middleware 3");
  //res.send("<p>Response from Middleware 3</p>");
  next();
});

app.get("/", (req, res, next)=> { // .get warna saare "/" path chal jaenge
  console.log("Root Middleware", req.url, req.method);
  res.send("<a href='/contact-us'>Contact Us</a><br>");
})

app.get("/contact-us", (req, res, next)=> {
  console.log("Contact Us Middleware", req.url, req.method);
  res.send(`<p>Contact Us Page</p>
    <form action="/contact-us" method="POST">
    <input type="text" name="name" placeholder="Enter your name" required>
    <input type="email" name="email" placeholder="Enter your email" required>
    <input type="submit" value="Submit">
    </form>
  `);
})

app.use(bodyParser.urlencoded()); // Middleware to parse URL-encoded bodies

app.post("/contact-us", (req, res, next)=> { // same path but different method being routed
  // Note: In a real application, you would need to parse the body of the request to access form data.
  console.log("Submit Middleware", req.url, req.method, req.body);
  res.send("<p>Form submitted successfully!</p>");
});


const port = 3000;

app.listen(port), () => {
  console.log(`Server is running on http://localhost:${port}`);
}