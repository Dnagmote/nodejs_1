const express = require("express");
const app = express();
const PORT = 5000;
var cors = require("cors");

const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true })), indexRouter.initialize(app);
require("./helper/mongodb");
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
