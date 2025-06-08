const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

module.exports = class Home {
  constructor(homeName, homePrice, homeLocation, homeImage) {
    this.homeName = homeName;
    this.homePrice = homePrice;
    this.homeLocation = homeLocation;
    this.homeImage = homeImage;
  }

  save() {
    const homesFilePath = path.join(rootDir, 'data', 'homes.json');

    fs.readFile(homesFilePath, (err, data) => {
      let homes = [];

      if (!err) {
        try {
          homes = JSON.parse(data); // Convert file content into JS array
        } catch (parseErr) {
          console.error('Failed to parse JSON:', parseErr);
        }
      }

      homes.push(this); // Add new home to the array

      fs.writeFile(homesFilePath, JSON.stringify(homes, null, 2), (err) => {
        if (err) {
          console.error("Error writing to file", err);
        } else {
          console.log("Home saved successfully.");
        }
      });
    });
  }

  static fetchAll(callback) {
    const homesFilePath = path.join(rootDir, 'data', 'homes.json');

    fs.readFile(homesFilePath, (err, data) => {
      if (err) {
        // If file not found or error, return empty array
        return callback([]);
      }

      try {
        const homes = JSON.parse(data);
        callback(homes);
      } catch (parseErr) {
        console.error('Failed to parse JSON:', parseErr);
        callback([]); // On parse error, fallback to empty list
      }
    });
  }
};
