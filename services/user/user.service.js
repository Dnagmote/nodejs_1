const model = require("./user.model");

class UserService {
    static async save(reqBody) {
        try {
            const result = await new model(reqBody).save();
            return result;
        } catch (error) {
            console.log("error :- ", error);
        }
    }

    static async getDetails(query) {
        return await model.findOne(query).lean();
    }

    static async list(reqQuery) {
        let query = {};

        if (reqQuery.userId && reqQuery.userId != "") {
            query["_id"] = reqQuery.userId;
        }

        if (reqQuery.searchKey && reqQuery.searchKey != "") {
            query["$or"] = [{ firstName: RegExp(".*" + reqQuery.searchKey + ".*", "i") }, { lastName: new RegExp(".*" + reqQuery.searchKey + ".*", "i") }];
        }

        console.log("query.searchkey :- ", query);

        return await model.find(query).lean();
    }

    static async update(query, reqBody) {
        return await model.findOneAndUpdate(query, { $set: reqBody }, { new: true });
    }

    static async delete(id) {
        return await model.findOneAndDelete({ _id: id });
    }
}

module.exports = UserService;
