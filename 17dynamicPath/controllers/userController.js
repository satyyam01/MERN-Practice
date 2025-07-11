const Favourite = require("../models/favourite");
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

// 3. home detail (get)
exports.homeDetailGet = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/store/homeList");
    } else {
      console.log("Home details found:", home);
      res.render("store/homeDetail", {
        pageTitle: "Home Detail",
        currentPage: "home",
        home: home,
      });
    }
  });
};

// 4. fav list (get)
exports.favListGet = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registeredHomes) => {

      // const favouriteHomes = registeredHomes.filter(home =>favourites. includes (home. id));

      const favWithDetails = favourites.map((homeId) =>
        registeredHomes.find((home) => home.id === homeId)
      );
        res.render("store/favList", {
          //favouriteHomes: favouriteHomes,
          favourites: favWithDetails,
          pageTitle: "Fav List",
          currentPage: "fav list",
      });
    });
  });
};

// 5. fav list (post)
exports.favListPost = (req, res, next) => {
  Favourite.addFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourites:", error);
    }
    res.redirect("/store/favList");
  });
};

// 6. reserve
exports.reserveGet = (req, res, next) => {
  res.render("store/reserve", { pageTitle: "reserve", currentPage: "reserve" });
};

// 7. bookings
exports.bookingsGet = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "bookings",
    currentPage: "bookings",
  });
};
