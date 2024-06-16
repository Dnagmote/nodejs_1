const express = require("express");
const router = express.Router();

router.get("/getProduct", (req, res) => {
    res.status(200).send({
        message: "Success Product",
    });
});

module.exports = router;
