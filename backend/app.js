const express = require('express');
const helmet = require("helmet");
const mongoose = require("mongoose");
require('dotenv').config();

//getting routes
const authRoutes = require("./routes/auth");

//config
const app = express();

//middlewares
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");                              //Which domains are allowed
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); //Which methods you want to allow
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");   //Which headers you want to allow
    next();
});

//setting routes
app.use("/auth", authRoutes);

//default error route
app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(statusCode).json({ message, data });
});

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => console.log(err));