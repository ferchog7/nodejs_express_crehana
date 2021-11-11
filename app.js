require('dotenv').config();

const express = require('express');
var jwt = require('jsonwebtoken');
const md5 = require('md5');
const app = express();
require('./config/db');

// Models
var User = require('./models/users');

// Routes Files
const users_routes = require('./routes/users');
const books_routes = require('./routes/books');
const categories_routes = require('./routes/categories');

const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Auth Process
app.set('key', 'L3n5g2uxZy9D');

app.post('/auth', (req, res) => {

  var email = req.body.email || '';
  var password = md5(req.body.password || '');
  var where = {email:email, password:password};

  User.findOne(where, (err, user) => {
    if(err) return res.status(500).send({message: 'Authenticate error.'});
    if(!user) return res.status(403).send({message: 'Authenticate error.'});

    const token = jwt.sign({check: true}, app.get('key'), {expiresIn: "2h"});

    res.status(200).send({
        message: 'Auth succesfully',
        token: token,
        user: user,
    });
  });
});

const routeProtect = express.Router();
routeProtect.use((req, res, next) => {
    const token = req.headers['access-token'];
    if(token) {
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if(err){
              res.status(401).send({message: 'Unauthorized access'});
            } else {
                res.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).send({message: 'Unauthorized access'});
    }
});

app.listen(port, function () {
  console.log(`Example app listening on ${port}!`)
})

// API Route
app.use('/users', users_routes);
app.use('/books', routeProtect, books_routes);
app.use('/categories', routeProtect, categories_routes);