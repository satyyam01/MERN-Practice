const express = require('express');

const path = require('path'); // used to add path functionality (for HTML files)

const userRouter  = require('./routes/userRouter');
const hostRouter = require("./routes/hostRouter")

const rootDir = require('./utils/pathUtil'); // used to provide functionality to let every js file import HTML files with their absolute path using the root directory of the project

const app = express(); // only required in the main file for server setup

// logs for every middlewware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})


app.use(express.static(path.join(rootDir, 'public'))); // serves static files (CSS) from the public directory [public folder ko public bana do]


app.use(express.urlencoded()); // parse URL-encoded bodies directly
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

