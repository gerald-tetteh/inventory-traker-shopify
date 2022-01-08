/**
 * Author: Gerald Addo-Tetteh
 * Project: Inventory Tracker
 *
 * Inventory controllers
 * This file contains controllers for all the
 * main site routes.
 */

const fetch = require("node-fetch");
const { Parser } = require("json2csv");

const constants = require("../utils/constants");
const helpers = require("../utils/helpers");

// initialization to parse to csv
// column names (csvFields)
const csvFields = [
  "id",
  "name",
  "description",
  "unitPrice",
  "quantity",
  "serialNo",
];
const csvParserOptions = { csvFields };
const parser = new Parser(csvParserOptions);

exports.getAllInventory = (req, res, next) => {
  fetch(constants.dbUrl)
    .then((response) => response.json())
    .then((inventory) => {
      res.render("index", { inventory });
    })
    .catch((err) => helpers.serverErrorHandler(err, next));
};
exports.getCreateItem = (req, res, next) => {
  res.render("create-edit-item", { edit: false, item: {}, messages: [] });
};
exports.postCreateItem = (req, res, next) => {
  const item = {
    name: req.body.name,
    description: req.body.description,
    unitPrice: req.body.unitPrice,
    quantity: req.body.quantity,
    serialNo: req.body.serialNo,
  };
  // determine if inventory already exists
  fetch(`${constants.dbUrl}?name=${item.name}`)
    .then((response) => response.json())
    .then((items) => {
      if (items.length > 0) {
        req.flash("Error", "Item with the same name already exits.");
        res.status(422).render("create-edit-item", {
          edit: false,
          item,
          messages: req.flash("Error"),
        });
      } else {
        // add to database if not already in it
        fetch(constants.dbUrl, {
          method: "POST",
          body: JSON.stringify(item),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            if (response.ok) {
              req.flash("Info", `${item.name} has been added to the inventory`);
              res.status(201).redirect("/");
            }
          })
          .catch((err) => helpers.serverErrorHandler(err, next));
      }
    })
    .catch((err) => helpers.serverErrorHandler(err, next));
};
exports.getEditItem = (req, res, next) => {
  const id = req.params.id;
  fetch(`${constants.dbUrl}/${id}`)
    .then((response) => response.json())
    .then((item) => {
      res.render("create-edit-item", { edit: true, item, messages: [] });
    })
    .catch((err) => helpers.serverErrorHandler(err, next));
};
exports.postEditItem = (req, res, next) => {
  const id = req.body.id;
  const item = {
    name: req.body.name,
    description: req.body.description,
    unitPrice: req.body.unitPrice,
    quantity: req.body.quantity,
    serialNo: req.body.serialNo,
  };
  fetch(`${constants.dbUrl}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        req.flash("Info", `${item.name} has been updated`);
        res.status(201).redirect("/");
      }
    })
    .catch((err) => helpers.serverErrorHandler(err, next));
};
exports.postDelete = (req, res, next) => {
  const id = req.body.id;
  fetch(`${constants.dbUrl}/${id}`, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        res.redirect("/");
      }
    })
    .catch((err) => helpers.serverErrorHandler(err, next));
};
exports.getExportToCsv = (req, res, next) => {
  fetch(constants.dbUrl)
    .then((response) => response.json())
    .then((items) => {
      const csv = parser.parse(items);
      // create file with filename
      res.attachment("inventory.csv");
      res.send(csv);
    })
    .catch((err) => helpers.serverErrorHandler(err, next));
};
