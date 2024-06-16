const userServices = require("./user.service");
const bcrypt = require("bcrypt");
const saltRound = 10;
const secretKey = { jwt_key: "secrete_dey" };
const jwt = require("jsonwebtoken");

class UserController {
    static async register(req, res) {
        try {
            const emailExist = await userServices.getDetails({ email: req.body.email });
            if (emailExist?.email) {
                return res.status("400").send({
                    message: "Email already exists.",
                });
            }

            const phoneNumberExist = await userServices.getDetails({ phoneNumber: req.body.phoneNumber });
            if (phoneNumberExist?.phoneNumber) {
                return res.status("400").send({
                    message: "Phone number already exists.",
                });
            }

            bcrypt.genSalt(saltRound, async function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    if (!req.body.password) {
                        return res.status("400").send({
                            message: "Password is required.",
                        });
                    }
                    req.body.password = hash;
                    const result = await userServices.save(req.body);
                    if (!result) {
                        return res.status("400").send({
                            message: "User not registerd.",
                        });
                    } else {
                        res.status("200").send({
                            message: "User registerd successfully.",
                            data: result,
                        });
                    }
                });
            });
        } catch (error) {
            console.log("error >>>>>>>", error);
            res.status(500).send({
                message: "Internal server error",
            });
        }
    }

    //Login

    static async login(req, res) {
        try {
            if (!req.body.email) {
                return res.status(400).json({
                    message: "Email is required.",
                });
            }
            if (!req.body.password) {
                return res.status(400).json({
                    message: "Password is required.",
                });
            }

            let findUser = await userServices.getDetails({ email: req.body.email });
            if (!findUser) {
                return res.status(400).json({
                    message: "User not found.",
                });
            } else {
                const matchPassword = bcrypt.compare(findUser.password, req.body.password);
                if (matchPassword) {
                    const token = jwt.sign(findUser, secretKey.jwt_key, {
                        expiresIn: "24h",
                    });

                    findUser.token = token;

                    return res.status(200).json({
                        status: "SUCCESS",
                        message: "User login successfully.",
                        data: findUser,
                    });
                } else {
                    return res.status(400).json({
                        status: "FAILURE",
                        message: "Email or password id incorrect.",
                    });
                }
            }
        } catch (error) {
            console.log("Error :-    ", error);
            return res.status(500).json({
                message: "Internal server error.",
            });
        }
    }

    // Get Details by id
    static async gerDetails(req, res) {
        try {
            console.log("=========req.params.userId ===========", req.params.userId);
            const fetchRecord = await userServices.getDetails({ _id: req.params.userId });
            console.log(" datafetchRecord :- ", fetchRecord);
            if (fetchRecord) {
                return res.status(200).send({
                    statusCode: "200",
                    message: " User fetched successfully.",
                    data: fetchRecord,
                });
            }
            return res.status(400).send({
                statusCode: "400",
                message: "user not found.",
            });
        } catch (error) {
            console.log("error >>>>>>>", error);
            res.status(500).send({
                message: "Internal server error",
            });
        }
    }

    // Get List
    static async list(req, res) {
        try {
            const list = await userServices.list(req.query);
            console.log(" datalist :- ", list);
            if (list) {
                return res.status(200).send({
                    statusCode: "200",
                    message: " User fetched successfully.",
                    data: list,
                });
            }
            return res.status(400).send({
                statusCode: "400",
                message: "user not found.",
            });
        } catch (error) {
            console.log("error >>>>>>>", error);
            res.status(500).send({
                message: "Internal server error",
            });
        }
    }

    // Updte Details
    static async update(req, res) {
        try {
            console.log("=========req.params.userId ===========", req.params.userId);
            const fetchRecord = await userServices.update({ _id: req.params.userId }, req.body);
            console.log(" datafetchRecord :- ", fetchRecord);
            if (fetchRecord) {
                return res.status(200).send({
                    statusCode: "200",
                    message: " User updated successfully.",
                    data: fetchRecord,
                });
            }
            return res.status(400).send({
                statusCode: "400",
                message: "user not found.",
            });
        } catch (error) {
            console.log("error >>>>>>>", error);
            res.status(500).send({
                message: "Internal server error",
            });
        }
    }

    // Delete by id
    static async delete(req, res) {
        try {
            console.log("=========req.params.userId ===========", req.params.userId);
            const deleteRecord = await userServices.delete({ _id: req.params.userId });
            console.log(" datadeleteRecord :- ", deleteRecord);
            if (deleteRecord) {
                return res.status(200).send({
                    statusCode: "200",
                    message: " User deleted successfully.",
                    data: deleteRecord,
                });
            }
            return res.status(400).send({
                statusCode: "400",
                message: "user not found.",
            });
        } catch (error) {
            console.log("error >>>>>>>", error);
            res.status(500).send({
                message: "Internal server error",
            });
        }
    }
}

module.exports = UserController;
