const jwt = require("jsonwebtoken");
const secretKey = { jwt_key: "secrete_dey" };

class Auth {
    static async verifyToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            console.log("req.headers.authorization----");
            const token = header.split(" ")[1];

            const isVerified = jwt.verify(token, secretKey.jwt_key);
            if (isVerified) {
                req["userId"] = isVerified._id;
                next();
            } else {
                res.status(400).json({
                    message: "Unathoriesd access.",
                });
            }
        } catch (error) {
            console.log("error :--   ", error);
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
    }
}

module.exports = Auth;
