const express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    csrf = require('csurf'),
    morgan = require('morgan'),
    routes = require("./routes"),
    favicon = require('serve-favicon'),
    JwtStrategy = require('passport-jwt').Strategy,
    passport = require('passport'),
    ExtractJwt = require('passport-jwt').ExtractJwt,
    config = require('config'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    app = express(),
    port = 3000;

const corsOptions = {
    origin: "*",
    methods: "GET, HEAD, PUT, POST, DELETE",
    allowHeaders: ["Content-Type", "Authorization", "x-auth-token", "ETag"],
    ptionsSuccessStatus: 200
};

class Server {

    constructor() {
        this.initDB();
        this.initExpressMiddleWare();
        this.initPassport();
        this.initRoutes();
        this.start();
    }

    start() {
        app.listen(port, (err) => {
            console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
        });
    }

    initExpressMiddleWare() {
        //app.use(favicon(__dirname + '/public/assets/images/favicon.ico'));
        app.use(express.static(__dirname + '/dist/web-app'));
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errorhandler());
        app.use(csrf({ cookie: true }));
        app.use(cors(corsOptions));
        app.use((req, res, next) => {
            let csrfToken = req.csrfToken();
            res.locals._csrf = csrfToken;
            res.cookie('XSRF-TOKEN', csrfToken);
            next();
        });

        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }

    initPassport() {
        app.use(passport.initialize());
        app.use(passport.session());
        let opts = {}
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = config.jwtPrivateKey;
        passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload._id);
            if (!user) done('Something is wrong', false);
            done(null, true);
        }))

    }

    initDB() {
        mongoose.connect('mongodb://localhost:27017/dbchartman', { useNewUrlParser: true })
            .then(() => { console.log('Connected to MongoDB') })
            .catch((err) => { console.log('Connection to database failed'); console.log(err) });
    }


    initRoutes() {
        routes.set(app);
        // redirect all others to the index (HTML5 history)
        app.all('/*', (req, res) => {
            res.sendFile(__dirname + '/dist/web-app/index.html');
        });
    }

}

let server = new Server();

/*
const routes = require("./routes")
var corsOptions = {
    origin: "*",
    methods: "GET, HEAD, PUT, POST, DELETE",
    allowHeaders: ["Content-Type", "Authorization", "x-auth-token", "ETag"],
    ptionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorhandler());
app.use(cookieParser());
routes.set(app);
require("./init/db")();


app.use(passport.initialize());
app.use(passport.session());

require("./middleware/passport")(passport);

dist / web - app

app.listen(3000, () => {
    console.log("Server started");
});
*/