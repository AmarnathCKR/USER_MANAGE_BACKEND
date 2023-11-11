require("./Database/db");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");


const userManage = require("./routes/userManage");
const adminManage = require("./routes/adminManage");


app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:5173", "https://usermanagement-amarnathckr.netlify.app/"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

app.use("/api/v1/admin",adminManage)
app.use("/api/v1/user",userManage)

const server = app.listen(5000, function () {
    console.log("Server is running on port 5000 ");
});

