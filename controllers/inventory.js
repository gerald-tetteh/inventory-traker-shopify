const fetch = require("node-fetch");

const constants = require("../utils/constants");

exports.getAllInventory = (req, res, next) => {
  fetch(constants.dbUrl)
    .then((response) => response.json())
    .then((inventory) => {
      res.render("index", { inventory });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
              req.flash("Info", `${item.name} has been added to the inventory`);
              res.status(201).redirect("/");
            }
          })
          .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.getEditItem = (req, res, next) => {
  const id = req.params.id;
  fetch(`${constants.dbUrl}/${id}`)
    .then((response) => response.json())
    .then((item) => {
      res.render("create-edit-item", { edit: true, item, messages: [] });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postDelete = (req, res, next) => {
  const id = req.body.id;
  fetch(`${constants.dbUrl}/${id}`, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        res.redirect("/");
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
