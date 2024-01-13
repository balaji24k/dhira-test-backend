const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

const sequelize = require("./util/database");
const userRoutes = require("./routes/authRoutes")

app.use(cors());
app.use(bodyParser.json());

app.use("/user",userRoutes)

sequelize.sync()
    .then(result => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err)
    })