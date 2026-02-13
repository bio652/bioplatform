const express = require("express");
const { isAuth } = require("../controllers/jwtcontroller");
const controller = require("../controllers/rtControllers/platformController");

const platformrt = express.Router();
platformrt.use(express.json());

platformrt.post("/getcatalog", isAuth, controller.getcatalog);
platformrt.get("/getitem/:itemtoken", isAuth, controller.getitem);
platformrt.get("/getinv", isAuth, controller.getinv);
platformrt.put("/buynft", isAuth, controller.buynft);
platformrt.put("/putonsale", isAuth, controller.putonsale);
platformrt.put("/putoutsale", isAuth, controller.putoutsale);
platformrt.post("/createnft", isAuth, controller.createnft);
platformrt.get("/getrand", controller.getrand);

module.exports = {
    platformrt,
}