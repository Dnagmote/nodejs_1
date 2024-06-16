const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/nodejs_1")
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Error :- ", error);
    });
