// file is used to provide functionality to let every js file import html files with their absolute path using the root directory of the project
const path = require('path');


module.exports = path.dirname(require.main.filename); // returns the directory name of the main module (app.js in this case)