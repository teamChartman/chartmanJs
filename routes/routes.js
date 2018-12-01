const auth = require("./auth.route")
const users = require("./users.route");
const account = require("./account.route");
const changePassword = require("./change.password.route");

module.exports = function(app){
    app.use("/api/auth", auth);
    app.use("/api/users", users);
    app.use("/api/account", account);
    app.use("/api/account/change-password", changePassword);
    app.get("/", (req, res)=>{
        res.send("Home")
    });
}