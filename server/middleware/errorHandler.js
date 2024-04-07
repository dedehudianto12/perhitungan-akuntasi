"use strict";

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.name === "SequelizeValidationError") {
    let newError = [];
    err.errors.forEach((element) => {
      newError.push(element.message);
    });
    res.status(400).json(newError);
  } else if (err.name === "JsonWebTokenError") {
    let message = "Unauthorized";
    res.status(401).json({ error: err.name, message: err.message });
  } else if (err.name === "Not Found") {
    res.status(404).json({ error: err.name, message: err.message });
  } else if (err.name === "forbidden") {
    res.status(403).json({ error: err.name, message: err.message });
  } else if (err.name === "Database error") {
    res.status(403).json({ error: err.name, message: err.message });
  } else {
    res.status(500).json({ error: err.name, message: err.message });
  }
}

module.exports = errorHandler;
