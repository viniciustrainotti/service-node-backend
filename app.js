const express    = require('express');
const app        = express();
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const PATH_START = process.env.PATH_START || '/services';

const Routes = require('./api/router/gateway');

console.log('MONGODB', 
            'USER'  , process.env.MONGO_USER,
            'PASS'  , process.env.MONGO_PASS,
            'HOST'  , process.env.MONGO_HOST,
            'PORT'  , process.env.MONGO_PORT,
            'DB'    , process.env.MONGO_DB,
            )

// MongoDB connection local
mongoose.connect(
    "mongodb://" + process.env.MONGO_USER + ":" 
                 + process.env.MONGO_PASS + "@" 
                 + process.env.MONGO_HOST + ":" 
                 + process.env.MONGO_PORT + "/" 
                 + process.env.MONGO_DB,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function(error){
        console.log(error)
    }
);

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use(PATH_START, Routes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});

module.exports = app;