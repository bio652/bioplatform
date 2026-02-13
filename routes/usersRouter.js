const express = require("express");
const { isAuth } = require("../controllers/jwtcontroller");
const controller = require("../controllers/rtControllers/usersController");

const usersrt = express.Router();
usersrt.use(express.json());

usersrt.post("/signup", controller.signup);
usersrt.get("/getuserdata", isAuth, controller.getuserdata);
usersrt.get("/addcoins", isAuth, controller.addcoins);
usersrt.get("/signout", isAuth, controller.signout);

module.exports = {
    usersrt,
};