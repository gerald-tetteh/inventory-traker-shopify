/**
 * Author: Gerald Addo-Tetteh
 * Project: Inventory Tracker
 *
 * Error Controllers
 * This file contains for the error page routes.
 */

exports.get404 = (req, res, next) => res.status(404).render("404");
exports.get500 = (error, req, res, next) => res.status(500).render("500");
