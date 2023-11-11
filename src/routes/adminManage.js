const router = require("express").Router();
const User = require("../Database/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuth = require("../middlewares/userAuth");
const { emailSender } = require("../helper/emailSender");
const { adminLogin, getAllUser, blockUser } = require("../controller/admin/adminController");


router.post("/login",adminLogin);

router.get("/all",userAuth,getAllUser)

router.get("/block-user",userAuth,blockUser)

module.exports = router;