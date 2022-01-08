/**
 * Author: Gerald Addo-Tetteh
 * Project: Inventory Tracker
 *
 * Helper functions util
 * This file contains helper functions used in multiple places of the
 * application.
 */

exports.serverErrorHandler = (err, next) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};
