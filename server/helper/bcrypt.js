"use strict";

const bcrypt = require("bcrypt");

const generate_password = (password) => {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const check_password = (password, hash) => {
  const check = bcrypt.compareSync(password, hash);
  return check;
};

module.exports = {
  generate_password,
  check_password,
};
