const Home = require("../models/home");

// HOST

// 1. add home
exports.addHomeGet = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Add Home",
    currentPage: "add-home",
    editing: false,
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
  });
};

// 3. edit home
exports.editHomeGet = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true"; // string to boolean convert

  Home.findById(homeId).then(
    ([homes]) => {
      const home = homes[0];
      if (!home) {
        console.log("Home not found");
        return res.redirect("/host/adminHomeList");
      }
      console.log(homeId, editing, home);
      res.render("host/editHome", {
        pageTitle: "Edit Home",
        currentPage: "host homes",
        editing: editing,
        home: home,
      });
    }
  );
};

// 4. edit home (post)
exports.editHomePost = (req, res, next) => {
  console.log(req.body);

  const home = new Home(
    req.body.homeName,
    req.body.homePrice,
    req.body.homeLocation,
    req.body.homeImage,
    req.body.homeDesc,
    req.body.homeRating,
    req.body.id
  );

  home.update();

  res.redirect("/host/adminHomeList")
  };

// 5. admin home list
exports.adminHomeListGet = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes, fields]) => {
    res.render("host/adminHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Home Page",
      currentPage: "host homes",
    }); // send registered homes array as argument to callback function in home model, jab fetchAll function se data aega then render the home.ejs file,
  });
};


exports.deleteHomePost = (req, res, next) => {
  const homeId = req.params.homeId;

  console.log(homeId);

  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/adminHomeList");
    })
    .catch(err => {
      console.error(err);
      res.redirect("/host/adminHomeList");
    });
};