const Joi = require('joi');
const { signupSchema } = require("./yupSchema")



const userValidate = async (req, res, next) => {
    console.log("visited");
    console.log(signupSchema);
    try {
        req.body = await signupSchema.validate(req.body);
        next();
    } catch (err) {
        console.log(err)
        throw res.status(404).send({ message: err.errors[0] })
    }

}


module.exports = userValidate;
