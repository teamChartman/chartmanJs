const auth = require("./account/")

module.exports.set = function(app){
    auth(app);
}