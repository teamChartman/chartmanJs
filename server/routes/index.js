const auth = require("./account/");
const entities = require("./entities/")

module.exports.set = function (app) {
    auth(app);
    entities(app);
}
