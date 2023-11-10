const router = require("express").Router();

const { userValidate, vaidateEdit, vaidatePassword, postValidate } = require("../middlewares/userValidater");
const userAuth = require("../middlewares/userAuth");
const { changePassword, editUser, fetchUser, login, signup, createPost, deletePost, editPost } = require("../controller/user/userController");



router.post("/signup", userValidate, signup);

router.post("/login", login)

router.get("/fetch-user", userAuth, fetchUser)

router.post("/edit", userAuth, vaidateEdit,editUser)

router.post("/change-pass", userAuth, vaidatePassword, changePassword)

router.post("/create-post", userAuth, postValidate,createPost)

router.post("/edit-post", userAuth, postValidate, editPost)

router.get("/delete-post", userAuth, deletePost)

module.exports = router;
