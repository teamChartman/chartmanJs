const auth = require("./account/")

module.exports.set = function(app){
    auth(app);

    app.get('/', function(req, res) {
        res.sendFile('views/test.html', {root: __dirname })
    });
}