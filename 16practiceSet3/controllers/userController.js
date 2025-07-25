const Home = require("../models/home");



// 1. home page
exports.homeGet = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
    }); // send registered homes array as argument to callback function in home model, jab fetchAll function se data aega then render the home.ejs file,
  });
  // render the home.ejs file with the registered homes array and page title;
};

// 2. home list
exports.homeListGet = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/homeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "home list",
    });
  });
};

// 3. home detail
exports.homeDetailGet = (req, res, next) => {
  res.render("store/homeDetail", {
    pageTitle: "Home Detail",
    currentPage: "home detail",
  });
};

// 4. fav list
exports.favListGet = (req, res, next) => {
  res.render("store/favList", {
    pageTitle: "Fav List",
    currentPage: "fav list",
  });
};

// 5. reserve
exports.reserveGet = (req, res, next) => {
  res.render("store/reserve", { pageTitle: "reserve", currentPage: "reserve" });
};

// 6. bookings
exports.bookingsGet = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "bookings",
    currentPage: "bookings",
  });
};
