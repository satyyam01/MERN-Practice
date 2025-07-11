const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { register } = require("module");
const { error } = require("console");
const Favourite = require("./favourite");

const homesFilePath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(
    homeName,
    homePrice,
    homeLocation,
    homeImage,
    homeDesc,
    homeRating,
    id
  ) {
    this.homeName = homeName;
    this.homePrice = homePrice;
    this.homeLocation = homeLocation;
    this.homeImage = homeImage;
    this.homeDesc = homeDesc;
    this.homeRating = homeRating;
    this.id = id;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        // edit case
        registeredHomes = registeredHomes.map((home) => {
          if (home.id === this.id) {
            // only edit the home whose id we got from the edit form in the contructor
            return this;
          }
          return home;
        });
      } else {
        // add case
        this.id = Math.random().toString(); // assigning random id to a home via "this" object
        registeredHomes.push(this);
      }

      fs.writeFile(
        homesFilePath,
        JSON.stringify(registeredHomes, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing to file", err);
          } else {
            console.log("Home saved successfully.");
          }
        }
      );
    });
  }

  static fetchAll(callback) {
    fs.readFile(homesFilePath, (err, data) => {
      if (err) {
        // If file not found or error, return empty array
        return callback([]);
      }
      try {
        const homes = JSON.parse(data);
        callback(homes);
      } catch (parseErr) {
        console.error("Failed to parse JSON:", parseErr);
        callback([]); // On parse error, fallback to empty list
      }
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }

  static deleteById(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter(home =>
        home.id !== homeId // if id of home to be deleted matches the id of the home in home array, then return false, which will remove the home from the array
      );
      fs.writeFile(
        homesFilePath,
        JSON.stringify(homes, null, 2), error => {
          Favourite.deleteById(homeId, callback)
        }
      );
    });
  }
};



