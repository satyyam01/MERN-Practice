const Home = require("../models/home");

// add home controlller
exports.addHomeGet = (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home", currentPage: "add-home" }); // render the addHome.ejs file with the page title
};

// home added controller
exports.addHomePost = (req, res, next) => {
  console.log(req.body);

  const home = new Home(
    req.body.homeName,
    req.body.homePrice,
    req.body.homeLocation,
    req.body.homeImage
  );

  home.save(); // save the home to the registeredHomes array in the Home model

  // const newHome = {
  //   homeName: req.body.homeName,
  //   homePrice: req.body.homePrice,
  //   homeLocation: req.body.homeLocation,
  //   homeImage: req.body.homeImage
  //   };

  // registeredHomes.push(newHome);

  res.render("homeAdded", {
    pageTitle: "Home Added",
    home: home,
    currentPage: "add-home",
  }); // render the homeAdded.ejs file with the page title and home name);
};

// home page controller
exports.homeGet = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("home", {
      registeredHomes: registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
    }) // send registered homes array as argument to callback function in home model, jab fetchAll function se data aega then render the home.ejs file,
  });
  // render the home.ejs file with the registered homes array and page title;
};
