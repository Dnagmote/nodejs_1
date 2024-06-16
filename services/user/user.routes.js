const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../helper/auth");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/getDetails/:userId", auth.verifyToken, userController.gerDetails);

router.get("/list", auth.verifyToken, userController.list);

router.get("/update/:userId", userController.update);

router.get("/delete/:userId", userController.delete);

module.exports = router;
