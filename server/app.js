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
    path = require('path'),
    port = 3000;
    db_host = config.get('dbConfig.host');
    db_port = config.get('dbConfig.port');
    db_db = config.get('dbConfig.dbName');


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
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errorhandler());
        app.use('/', express.static(path.join(__dirname, '/public')))
        //app.use(csrf({ cookie: true }));
        app.use(cors(corsOptions));
        /*app.use((req, res, next) => {
            let csrfToken = req.csrfToken();
            res.locals._csrf = csrfToken;
            res.cookie('XSRF-TOKEN', csrfToken);
            next();
        });*/

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
        mongoose.connect('mongodb://'+db_host+':'+db_port+'/'+db_db, { useNewUrlParser: true })
            .then(() => { console.log('Connected to MongoDB') })
            .catch((err) => { console.log('Connection to database failed'); console.log(err) });
    }


    initRoutes() {
        routes.set(app);
        // redirect all others to the index (HTML5 history)
        app.all('/*', (req, res) => {        
            res.sendFile(__dirname + '/public/index.html');
        });
    }

}

let server = new Server();