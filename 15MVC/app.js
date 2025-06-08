const express = require('express');

const path = require('path'); // used to add path functionality (for HTML files)

const userRouter  = require('./routes/userRouter');
const { hostRouter } = require("./routes/hostRouter"); // import the registered homes array from hostRouter = require("./routes/hostRouter")

const rootDir = require('./utils/pathUtil'); // used to provide functionality to let every js file import HTML files with their absolute path using the root directory of the project

const app = express(); // only required in the main file for server setup

app.set('view engine', 'ejs'); // sets the view engine to EJS
app.set('views', 'views'); // sets the views directory to the views folder in the root directory

app.use(express.static(path.join(rootDir, 'public'))); // serves static files (CSS) from the public directory [public folder ko public bana do]

app.use(express.urlencoded()); // parse URL-encoded bodies directly


const errorController = require('./controllers/404'); // import the error controller to handle errors

// logs for every middlewware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

app.use(userRouter);
app.use("/host", hostRouter);

app.use(errorController.error);




const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

