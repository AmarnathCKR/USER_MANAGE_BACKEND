const { isValidObjectId } = require("mongoose");
const yup = require("yup");

const signupSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required("Name can not be empty")
        .test("isPerfectString", "Enter a valid name", (arg) =>
            /^[A-Za-z ]+$/.test(arg)
        ),
    
    email: yup
        .string()
        .trim()
        .required("Enter you email")
        .test("isvalidEmail", "Enter a valid Email", (arg) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(arg)
        ),
    password: yup
        .string()
        .trim()
        .required("Password can not be empty")
        .min(8, "Too short password")
        .max(16, "Too long password")
        .test("isPerfectPasswrod", "Enter a strong password", (arg) =>
            /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*\s).{8,16})/.test(
                arg
            )
        ),
    
});

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required("Enter you email")
        .test("isvalidEmail", "Enter a valid Email", (arg) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(arg)
        ),
    password: yup.string().trim().required("Password can not be empty"),
});

module.exports.signupSchema = signupSchema;
module.exports.loginSchema = loginSchema;