const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");
router.post("/register", userController.create);
router.post("/generate", userController.generate)
router.post("/authenticate", userController.authenticate);
module.exports = router;
