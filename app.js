const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');
app.use(express.json());

var corsOptions = {
    origin : "*",
    methods: "GET, HEAD, PUT, POST, DELETE",
    allowHeaders: ["Content-Type", "Authorization", "x-auth-token", "ETag"],
    ptionsSuccessStatus: 200
};
app.use(cors(corsOptions));
require("./routes/routes")(app);
require("./init/db")();


app.use(passport.initialize());
app.use(passport.session());

require("./middleware/passport")(passport);

app.listen(3000, ()=>{
    console.log("Server started");
});