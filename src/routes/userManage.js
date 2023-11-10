const router = require("express").Router();
const User = require("../Database/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidate = require("../middlewares/userValidater");
const userAuth = require("../middlewares/userAuth");
const { emailSender } = require("../helper/emailSender");

const createToken = (_id) => {
  return jwt.sign({ _id }, "secretkey");
};


router.post("/signup", userValidate, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      console.log("User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    
    const hashPassword = await bcrypt.hash(password, 10);

    let newUser = new User({
      name,
      email,
      password: hashPassword,
      status: true
    })

    await newUser.save();
    let html = `<html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              padding: 20px;
            }
      
            h1 {
              color: #ff6600;
              text-align: center;
            }
      
            p {
              font-size: 18px;
              color: #333;
              text-align: center;
            }
      
            
          </style>
        </head>
        <body>
          <h1>Your account has been created</h1>
          <p>Hello <span class="username">${newUser.name}</span>,</p>
          <p>Your email (<span class="useremail">${newUser.email}</span>) 
        </body>
      </html>`
    await emailSender(newUser.email, html, "Welcome to Example.com");

    const userId = newUser._id;
    const token = await createToken(userId);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ email }).then(async (user) => {
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
})

router.get("/fetch-user", userAuth, async (req,res)=>{
  const {id}=req.params;
  const userValid = await User.findOne({_id : id});
  if(userValid.status){
    const user = {
      email : userValid.email,
      name : userValid.name
    }
    res.status(200).json({user})
  }else{
    res.status(404).send({error : "user blocked"});
  }

})

module.exports = router;