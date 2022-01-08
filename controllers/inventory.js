const constants = require("../utils/constants");

exports.getAllInventory = (req, res, next) => {
  fetch(constants.dbUrl)
    .then((response) => response.json())
    .then((inventory) => {
      res.render("view-inventory", { inventory });
    });
};
