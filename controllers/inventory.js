const fetch = require("node-fetch");

const constants = require("../utils/constants");

exports.getAllInventory = (req, res, next) => {
  fetch(constants.dbUrl)
    .then((response) => response.json())
    .then((inventory) => {
      res.render("index", { inventory });
    })
    .catch((err) => console.log(err));
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
        fetch(constants.dbUrl, {
          method: "POST",
          body: JSON.stringify(item),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            if (response.ok) {
              res.status(201).redirect("/");
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
exports.getEditItem = (req, res, next) => {
  const id = req.params.id;
  fetch(`${constants.dbUrl}/${id}`)
    .then((response) => response.json())
    .then((item) => {
      res.render("create-edit-item", { edit: true, item, messages: [] });
    })
    .catch((err) => console.log(err));
};
exports.postEditItem = (req, res, next) => {};
