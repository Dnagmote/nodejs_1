const userRoute = require("../services/user/user.routes");
const productRoute = require("../services/product/product.routes");

const initialize = (app) => {
    app.use("/user", userRoute);
    app.use("/product", productRoute);
};

module.exports = { initialize };
