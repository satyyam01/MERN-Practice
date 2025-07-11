const fs = require('fs').promises;
const path = require('path');
const rootDir = require('../utils/pathUtil');

const favFilePath = path.join(rootDir, 'data', 'favourite.json');

module.exports = class Favourite {
  static async addFavourite(homeId) {
    try {
      const favourites = await Favourite.getFavourites();

      if (favourites.includes(homeId)) {
        console.log("Home already in favourites");
        return; // gracefully return
      }

      favourites.push(homeId);
      await fs.writeFile(favFilePath, JSON.stringify(favourites, null, 2));
    } catch (err) {
      console.error("Error adding to favourites:", err);
      throw err;
    }
  }

  static async getFavourites() {
    try {
      const data = await fs.readFile(favFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') return []; // file not found
      console.error("Failed to read favourites:", err);
      return [];
    }
  }
};
