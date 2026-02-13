const express = require("express");
const { isAuth } = require("../controllers/jwtcontroller");
const { isAdmin } = require("../controllers/admincontroller");
const controller = require("../controllers/rtControllers/adminController");

const adminrt = express.Router();

adminrt.delete("/killuser/:userid", isAuth, isAdmin, controller.killuser);
adminrt.get("/confiscateuser/:userid", isAuth, isAdmin, controller.confiscateall);
adminrt.delete("/killnft/:nft", isAuth, isAdmin, controller.killnft);
adminrt.get("/confiscatenft/:nft", isAuth, isAdmin, controller.confiscatenft);

module.exports = {
    adminrt
}