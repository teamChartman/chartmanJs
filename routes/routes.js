const auth = require("./auth.route")
const users = require("./users.route");
const account = require("./account.route");

module.exports = function(app){
    app.use("/api/auth", auth);
    app.use("/api/users", users);
    app.use("/api/account", account);
    app.get("/", (req, res)=>{
        res.send("Home")
    });
}