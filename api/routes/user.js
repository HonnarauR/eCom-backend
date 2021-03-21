const express = require('express');
const UserController = require("../controllers/user");

const router = express.Router();

//
router.get("/",UserController.get_all_user);

router.post("/signup",UserController.signup);

router.post("/login",UserController.login);


module.exports = router;