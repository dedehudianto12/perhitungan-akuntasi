"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/", userController.create);
router.post("/login", userController.login);

module.exports = router;
