const project = require("./project.route")


module.exports = function (app) {
    app.use("/api/projects", project);
}