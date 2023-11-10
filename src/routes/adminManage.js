const router = require("express").Router();
const User = require("../Database/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidate = require("../middlewares/userValidater");
const userAuth = require("../middlewares/userAuth");
const { emailSender } = require("../helper/emailSender");


router.get("/all", async (req, res) => {
    await User.find({})
        .then((result) => {
            res.send(result);
        })
})

module.exports = router;