const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const { register } = require('module');

const favFilePath = path.join(rootDir, 'data', 'favourite.json');


module.exports = class Favourite {
  static addFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {

        if(favourites.includes(homeId))
          {
            callback("Home already in favourites");
          }
        else {
          favourites.push(homeId);
          fs.writeFile(favFilePath, JSON.stringify(favourites, null, 2), callback)
        }
    })
  }

  static getFavourites(callback) {
    const favFilePath = path.join(rootDir, 'data', 'favourite.json');

        fs.readFile(favFilePath, (err, data) => {
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
