const Home = require("../models/home");

// HOST

// 1. add home
exports.addHomeGet = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Add Home",
    currentPage: "add-home",
  }); // render the addHome.ejs file with the page title
};

// 2. home added
exports.addHomePost = (req, res, next) => {
  console.log(req.body);

  const home = new Home(
    req.body.homeName,
    req.body.homePrice,
    req.body.homeLocation,
    req.body.homeImage,
    req.body.homeDesc,
    req.body.homeRating
  );

  home.save();

  res.render("host/homeAdded", {
    pageTitle: "Home Added",
    home: home,
    currentPage: "add-home",
  }); // render the homeAdded.ejs file with the page title and home name);
};

// 3. edit home
exports.editHomeGet = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Edit Home",
    currentPage: "edit-home",
  });
};

// admin home list
exports.adminHomeListGet = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/adminHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
    }); // send registered homes array as argument to callback function in home model, jab fetchAll function se data aega then render the home.ejs file,
  });
  // render the home.ejs file with the registered homes array and page title;
};
