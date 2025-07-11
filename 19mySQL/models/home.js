

const db = require('../utils/dbUtil');


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
    return db.execute(
      "INSERT INTO homes (homeName, homePrice, homeLocation, homeImage, homeDesc, homeRating) VALUES (?, ?, ?, ?, ?, ?)", [this.homeName, this.homePrice, this.homeLocation, this.homeImage, this.homeDesc, this.homeRating]);
  }

  update() {
    return db.execute(
      "UPDATE homes SET homeName = ?, homePrice = ?, homeLocation = ?, homeImage = ?, homeDesc = ?, homeRating = ? WHERE id = ?",
      [
        this.homeName,
        this.homePrice,
        this.homeLocation,
        this.homeImage,
        this.homeDesc,
        this.homeRating,
        this.id,
      ]
    );
  }

  static fetchAll(callback) {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
