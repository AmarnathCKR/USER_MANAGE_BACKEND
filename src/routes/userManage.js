const router = require("express").Router();

const { userValidate, vaidateEdit, vaidatePassword, validatePost } = require("../middlewares/userValidater");
const userAuth = require("../middlewares/userAuth");
const { changePassword, editUser, fetchUser, login, signup, createPost, deletePost, editPost, fetchMypost, fetchAllPost } = require("../controller/user/userController");



router.post("/signup", userValidate, signup);

router.post("/login", login)

router.get("/fetch-user", userAuth, fetchUser)

router.post("/edit", userAuth, vaidateEdit,editUser)

router.post("/change-pass", userAuth, vaidatePassword, changePassword)

router.post("/edit-post", userAuth, validatePost, editPost)

router.post("/create-post", userAuth, validatePost ,createPost)

router.get("/delete-post", userAuth, deletePost)

router.get("/fetch-mypost",userAuth,fetchMypost)

router.get("/fetch-allpost",userAuth,fetchAllPost)

module.exports = router;
