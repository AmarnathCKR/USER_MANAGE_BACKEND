const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../Database/userSchema");
const Post = require("../../Database/postSchema");
const Admin = require("../../Database/adminSchema");
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KET_JWT);
};




const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        await Admin.findOne({ email }).then(async (user) => {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = await createToken(user._id);
                console.log(token)
                res.status(200).json({ token });
            } else {
                res.status(404).send({ error: "invalid email or password" });
            }
        }).catch((err) => {
            res.status(404).send({ error: "invalid email or password" });
        })
    } catch (err) {
        res.status(200).json({ message: err });
    }
}

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(200).json({allUser});
    } catch (err) {
        res.status(200).send({ message: err });
    }
}

const blockUser = async (req, res) => {
    try {
        const {userId,arg}=req.query;
        console.log(req.query)
        let status = false;
        if(arg === "true") status = true;
         await User.findByIdAndUpdate(userId,{
            status : status
        });
        const allUser = await User.find();
        res.status(200).json({allUser});
    } catch (err) {
        res.status(200).send({ message: err });
    }
}



module.exports.adminLogin = adminLogin;
module.exports.getAllUser = getAllUser;
module.exports.blockUser = blockUser;